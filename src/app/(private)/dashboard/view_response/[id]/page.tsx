'use client';

import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    User, Spinner, Chip
} from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { formatDateTime } from "@/context/helper";
import { GET_BASE } from "packages/api";
import { Button, Header } from "@components";
import { Parser } from 'json2csv';

interface Submission {
    assignment_id: string;
    student: {
        id: string;
        name: string;
        email: string;
    };
    status: "SUBMITTED" | "PENDING";
    answers: Record<string, any> | null;
    submitted_at: string | null;
    is_submitted: boolean;
}

interface FormField {
    id: string;
    type: string;
    label: string;
    required: boolean;
}

interface FormInfo {
    id: string;
    title: string;
    deadline: string;
    total_assigned: number;
    total_submitted: number;
    fields: FormField[];
}

export default function ViewResponse() {
    const params = useParams();
    const router = useRouter();
    const formId = params.id as string;

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [formInfo, setFormInfo] = useState<FormInfo | null>(null);
    const [loading, setLoading] = useState(true);

    const exportToCSV = () => {
        try {
            const submittedOnly = submissions.filter(s => s.is_submitted);

            const dataToExport = submittedOnly.map(sub => {
                const row: any = {
                    "Student Name": sub.student.name,
                    "Student Email": sub.student.email,
                    "Submitted At": sub.submitted_at ? formatDateTime(sub.submitted_at) : "N/A",
                };

                formInfo?.fields.forEach(field => {
                    row[field.label] = sub.answers ? sub.answers[field.id] : "—";
                });

                return row;
            });

            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(dataToExport);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formInfo?.title || 'responses'}.csv`);
            link.click();
            toast.success("Exported successfully!");
        } catch (err) {
            toast.error("Failed to export data");
        }
    };

    useEffect(() => {
        const fetchResponses = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${GET_BASE}/teacher/forms/${formId}/responses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Asky ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await res.json();

                if (result.success) {
                    setSubmissions(result.responses);
                    setFormInfo(result.form);
                } else {
                    toast.error(result.message || "Failed to load responses");
                }
            } catch (err) {
                toast.error("Network error. Server might be down.");
            } finally {
                setLoading(false);
            }
        };

        if (formId) fetchResponses();
    }, [formId]);

    if (loading) return (
        <div className="flex flex-col gap-4 items-center justify-center h-[60vh]">
            <Spinner size="lg" label="Loading submissions..." color="primary" labelColor="primary" />
        </div>
    );

    const columns = [
        { key: "student", label: "STUDENT", allowsSorting: true, required: false },
        { key: "status", label: "STATUS", width: "w-fit", required: false },
        { key: "submitted_at", label: "DATE", width: "w-fit", required: false },
        ...(formInfo?.fields.map(field => ({
            key: field.id,
            label: field.label,
            required: field.required
        })) || [])
    ];

    return (
        <div className="flex flex-col gap-6 max-w-full overflow-hidden">
            <Toaster richColors position="top-right" />

            <Header
                headerTitle={
                    <div className="flex items-center gap-4">
                        <Button
                            isIconOnly
                            variant="flat"
                            onPress={() => router.back()}
                            className="bg-gray-100 rounded-xl"
                        >
                            <ArrowLeft size={20} />
                        </Button>
                        <div className="min-w-0">
                            <h1 className="text-lg md:text-xl font-bold text-primary-600 truncate">
                                {formInfo?.title || "Form Responses"}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 text-xs md:sm">
                                <FileText size={14} />
                                <span>{formInfo?.total_submitted} / {formInfo?.total_assigned} Submitted</span>
                            </div>
                        </div>
                    </div>
                }
                endContent={
                    <Button
                        startContent={<Download size={18} />}
                        onPress={exportToCSV}
                        className="bg-primary-600 text-white font-semibold rounded-xl shadow-md min-w-fit"
                    >
                        <span className="hidden sm:inline">Export CSV</span>
                        <span className="sm:hidden">Export</span>
                    </Button>
                }
                headerClass="gap-4 md:gap-10"
                className="p-4 justify-between"
            />

            {/* Table Wrapper for Horizontal Scroll on Mobile */}
            <div className="w-full overflow-x-auto rounded-3xl bg-white">
                <Table
                    aria-label="Student responses"
                    isHeaderSticky
                    removeWrapper // We use our own wrapper for better border control
                    classNames={{
                        base: "min-w-[800px] w-full bg-white", // Ensures table doesn't squish too much on mobile
                        table: "min-w-full",
                        th: "bg-gray-100 first:rounded-none shadow-xl last:rounded-none px-4",
                        td: "py-4 px-4 border-b border-gray-200 whitespace-nowrap",
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.key}
                                // Reduce width for status and date, let student/answers grow
                                className={`font-bold ${column.key === 'status' || column.key === 'submitted_at' ? 'w-1' : ''}`}
                            >
                                <div className="flex items-center gap-1 text-primary-600 uppercase text-[11px]">
                                    {column.label}
                                    {column.required && <span className="text-danger-500">*</span>}
                                </div>
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={submissions} emptyContent={"No assignments found."}>
                        {(item) => (
                            <TableRow key={item.assignment_id}>
                                {(columnKey) => {
                                    if (columnKey === "student") {
                                        return (
                                            <TableCell className="min-w-[200px]">
                                                <User
                                                    name={item.student.name}
                                                    description={item.student.email}
                                                    avatarProps={{
                                                        size: "sm",
                                                        showFallback: true,
                                                        className: item.is_submitted ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-400"
                                                    }}
                                                />
                                            </TableCell>
                                        );
                                    }
                                    if (columnKey === "status") {
                                        return (
                                            <TableCell className="w-1">
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color={item.is_submitted ? "success" : "warning"}
                                                    className="capitalize font-bold px-2"
                                                >
                                                    {item.status.toLowerCase()}
                                                </Chip>
                                            </TableCell>
                                        );
                                    }
                                    if (columnKey === "submitted_at") {
                                        return (
                                            <TableCell className="text-gray-500 text-xs w-1">
                                                {item.submitted_at ? formatDateTime(item.submitted_at) : "Pending"}
                                            </TableCell>
                                        );
                                    }

                                    return (
                                        <TableCell className={`text-sm max-w-[300px] truncate ${item.is_submitted ? "text-gray-700 font-medium" : "text-gray-300 italic"}`}>
                                            {item.answers ? (item.answers[columnKey as string] || "—") : "No Data"}
                                        </TableCell>
                                    );
                                }}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
'use client';

import { Button, CustomCard, Dropdown, Header, Input, Progress } from "@components";
import { EllipsisVertical, Pause, Pencil, Play, Plus, Search, Trash2, Clock, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { handleDashboardDropdownAction } from "./actions";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/context/helper";
import { cn } from "@heroui/react";
import { useCommonStore } from "@store";
import { GET_BASE } from "packages/api";

// Unified Interface to handle both API responses
interface FormItem {
    form_id: string;
    title: string;
    deadline: string;
    created_at: string;
    is_active: boolean;
    fields_count: number;
    // Teacher specific
    total_assigned?: number;
    submitted_count?: number;
    progress?: number;
    // Student specific
    assignment_id?: string;
    status?: "PENDING" | "SUBMITTED";
    can_fill?: boolean;
}

export default function DashboardPage() {
    const router = useRouter();
    const [forms, setForms] = useState<FormItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const role = useCommonStore((state) => state.role);
    const setRole = useCommonStore((state) => state.setRole);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role) setRole(role);
    }, []);

    const isTeacher = role === "TEACHER";

    const getDropdownItems = (isActive: boolean) => [
        {
            key: isActive ? 'deactivate' : 'activate',
            label: isActive ? 'Deactivate' : 'Activate',
            startContent: isActive ? <Pause size={16} /> : <Play size={16} />,
        },
        { key: 'edit', label: 'Edit', startContent: <Pencil size={16} /> },
        { key: 'delete', label: 'Delete', startContent: <Trash2 size={16} />, className: 'text-danger' },
    ];

    useEffect(() => {
        if (!role) return;

        const fetchDashboard = async () => {
            const token = localStorage.getItem('token');
            const endpoint = isTeacher
                ? `${GET_BASE}/teacher/dashboard`
                : `${GET_BASE}/student/dashboard`;

            try {
                const res = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Asky ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await res.json();
                if (result.success) {
                    setForms(result.data);
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [role, isTeacher]);

    const filteredForms = forms.filter(form =>
        form.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-4">
            <Header headerTitle={isTeacher ? "Teacher Dashboard" : "My Assignments"} />

            <div className="p-1 py-2 grid gap-5">
                <div className="flex justify-between items-center">
                    <div className="w-72">
                        <Input
                            startContent={<Search size={18} />}
                            placeholder="Search forms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {isTeacher && (
                        <Button startContent={<Plus />} onPress={() => router.push('/create-form')}>
                            Create New
                        </Button>
                    )}
                </div>
                <div className="h-[calc(100vh-160px)] overflow-y-scroll scrollbar-hide">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                        {loading ? (
                            <p className="text-gray-500">Loading forms...</p>
                        ) : filteredForms.length > 0 ? (
                            filteredForms.map((form) => (
                                <CustomCard
                                    key={form.form_id}
                                    isDisabled={!form.is_active}
                                    isPressable={isTeacher || form.status !== "SUBMITTED"}
                                    onPress={() => {
                                        if (isTeacher) {
                                            router.push(`/dashboard/view_response/${form.form_id}`);
                                        } else if (form.status === "PENDING") {
                                            router.push(`/forms/${form.form_id}`);
                                        }
                                    }}
                                    title={form.status === "SUBMITTED" ? "Already Submitted" : undefined}
                                    className={cn("cursor-pointer", form.status === "SUBMITTED" && "cursor-not-allowed")}
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <div className="w-full">
                                                <p className="font-semibold text-lg uppercase truncate">{form.title}</p>
                                                <div className="flex justify-between">
                                                    <p className={cn("text-xs text-gray-400 hidden", isTeacher && "block")}>
                                                        Assigned: {form.total_assigned}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Fields: {form.fields_count}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Dropdown only for Teachers */}
                                            {isTeacher ? (
                                                <Dropdown
                                                    className="w-8 z-10"
                                                    triggerLabel={<EllipsisVertical className="text-gray-500" />}
                                                    items={getDropdownItems(form.is_active)}
                                                    onAction={(key) =>
                                                        handleDashboardDropdownAction(key, form.title, form.is_active)
                                                    }
                                                />
                                            ) : (
                                                <div className={cn("ml-2 flex gap-2", form.status === "SUBMITTED" ? "text-success" : "text-warning")}>
                                                    <p>
                                                        {form.status === "SUBMITTED" ?
                                                            <CheckCircle size={16} /> :
                                                            <Clock size={16} />
                                                        }
                                                    </p>
                                                    <p className="text-xs">{form.status}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            {/* Progress Bar only for Teachers */}
                                            {isTeacher && (
                                                <div className="p-1 pb-3">
                                                    <Progress
                                                        value={form.progress}
                                                        label="Submissions"
                                                        customColor="text-primary-500"
                                                        valueLabel={`${form.submitted_count} / ${form.total_assigned}`}
                                                    />
                                                </div>
                                            )}

                                            <div className="border-t py-2 px-1 flex flex-col gap-1">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-[10px] text-danger font-medium">
                                                        Deadline: {formatDateTime(form.deadline)}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400">
                                                        Created: {formatDateTime(form.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CustomCard>
                            ))
                        ) : (
                            <p className="text-gray-500">No forms found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
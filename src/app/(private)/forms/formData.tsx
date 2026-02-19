'use client';

import { Button, Header, Input } from '@components';
import { useFormDataStore } from '@store';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatDateTime } from '@/context/helper';
import { toast, Toaster } from 'sonner';
import { GET_BASE, POST_BASE } from 'packages/api';

interface FormSchema {
    form_id: string;
    title: string;
    deadline: string;
    fields: Array<{
        id: string;
        type: string;
        label: string;
        required: boolean;
    }>;
    is_active: boolean;
}

export default function FormDataUI() {
    const params = useParams();
    const router = useRouter();
    const formId = params.id as string;

    const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Track validation errors locally for field highlighting
    const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

    const formData = useFormDataStore((state) => state.formData);
    const setFieldValue = useFormDataStore((state) => state.setFieldValue);
    const resetForm = useFormDataStore((state) => state.resetForm);

    useEffect(() => {
        const fetchFormDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${GET_BASE}/student/forms/${formId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Asky ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await res.json();

                if (result.success) {
                    setFormSchema(result.data);
                } else {
                    toast.error(result.message || "Failed to load form");
                }
            } catch (err) {
                toast.error("An error occurred while fetching form details");
            } finally {
                setLoading(false);
            }
        };

        if (formId) fetchFormDetails();
        return () => resetForm();
    }, [formId, resetForm]);

    const handleSubmit = async () => {

        if (!formSchema) return;

        const newFieldErrors: Record<string, boolean> = {};
        const missingFields = formSchema.fields.filter((field) => {
            if (!field.required) return false;
            const value = formData[field.id];
            const isInvalid = !value || (typeof value === 'string' && value.trim() === '');

            if (isInvalid) newFieldErrors[field.id] = true;
            return isInvalid;
        });

        if (missingFields.length > 0) {
            setFieldErrors(newFieldErrors);
            const labels = missingFields.map(f => f.label).join(', ');
            toast.warning(`Required: ${labels}`, {
                description: "Please fill in all mandatory fields."
            });
            return;
        }

        setSubmitting(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${POST_BASE}/student/forms/submit`, {
                method: 'POST',
                headers: {
                    'Authorization': `Asky ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    form_id: formId,
                    response_data: formData
                })
            });

            const result = await response.json();

            if (result.success) {
                // This will now show in green
                toast.success("Form submitted successfully!");
                resetForm();
                setTimeout(() => router.push('/dashboard'), 1500);
            } else {
                // This will now show in red
                toast.error(result.message || "Submission failed");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-primary-500 font-medium">Loading form details...</div>;
    if (!formSchema) return <div className="p-10 text-center">Form not found.</div>;

    return (
        <div className="flex flex-col gap-3">
            {/* Added richColors here to enable success/error/warning colors */}
            <Toaster richColors closeButton position='top-right' duration={3000} />

            <Header headerTitle="Fill Form" />
            <div className="flex flex-col gap-4 justify-center items-center">

                <div className='flex justify-between items-center bg-white py-3 px-4 rounded-xl shadow-sm border border-gray-100 w-full md:w-[560px]'>
                    <p className='text-primary-500 text-xl font-bold'>{formSchema.title}</p>
                    <div className='text-right'>
                        <p className='text-danger-500 text-[10px] font-black uppercase tracking-wider'>Deadline</p>
                        <p className='text-gray-600 text-xs font-medium'>{formatDateTime(formSchema.deadline)}</p>
                    </div>
                </div>

                <div className="relative flex flex-col gap-4 w-full md:w-[560px] h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide px-1 pb-20 mt-2">
                    {formSchema.fields.map((field) => (
                        <div key={field.id} className='bg-white p-5 rounded-2xl shadow-sm border border-gray-50'>
                            <Input
                                label={field.label}
                                type={field.type as any}
                                isRequired={field.required}
                                placeholder={`Type your answer here...`}
                                value={formData[field.id] || ''}
                                // Clear error for this field when user types
                                onChange={(e) => {
                                    setFieldValue(field.id, e.target.value);
                                    if (fieldErrors[field.id]) {
                                        setFieldErrors(prev => ({ ...prev, [field.id]: false }));
                                    }
                                }}
                                // UI Feedback for errors
                                isInvalid={fieldErrors[field.id]}
                                errorMessage={fieldErrors[field.id] ? "This field is required" : ""}
                                variant='underlined'
                                labelPlacement='outside'
                                classNames={{
                                    label: "text-gray-700 font-semibold mb-2",
                                    inputWrapper: 'border-primary-400 hover:border-primary-600 transition-colors',
                                    input: 'py-2'
                                }}
                            />
                        </div>
                    ))}

                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[560px] px-4">
                        <Button
                            className="w-full bg-primary-600 text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary-200"
                            onPress={handleSubmit}
                            isLoading={submitting}
                        >
                            Submit Response
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
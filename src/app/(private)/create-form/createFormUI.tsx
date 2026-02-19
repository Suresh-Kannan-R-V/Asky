/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button, Checkbox, DateInput, Header, Input, Select } from '@components';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Select as HeroSelect,
    SelectItem
} from '@heroui/react';
import { toast } from 'sonner'; // or your preferred toast library
import { useCreateForm } from '@store';
import { Asterisk, Plus, Trash2Icon, Type, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const fieldTypeOptions = [
    { key: 'text', label: 'Text' },
    { key: 'number', label: 'Number' },
    { key: 'email', label: 'Email' },
    { key: 'date', label: 'Date' },
];

export default function CreateFormUI() {
    const router = useRouter();
    // Modal & Loading State
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSaving, setIsSaving] = useState(false);
    const [students, setStudents] = useState<{ id: string, name: string, email: string }[]>([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState<Set<string>>(new Set([]));

    // fields for the Create Form store
    const title = useCreateForm((state) => state.title);
    const fields = useCreateForm((state) => state.fields);
    const deadline = useCreateForm((state) => state.deadline);

    // functions for the Create Form store
    const setTitle = useCreateForm((state) => state.setTitle);
    const setDeadline = useCreateForm((state) => state.setDeadline);
    const addField = useCreateForm((state) => state.addField);
    const updateField = useCreateForm((state) => state.updateField);
    const buildJsonSchema = useCreateForm((state) => state.buildJsonSchema);
    const removeField = useCreateForm((state) => state.removeField);

    // Fetch Students on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('http://localhost:8000/asky/students', {
            method: 'GET',
            headers: {
                'Authorization': `Asky ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data) setStudents(data.data);
            })
            .catch(err => console.error("Error fetching students:", err));
    }, []);

    const handleOpenModal = () => {
        if (!title || fields.length === 0) {
            alert("Please provide a title and at least one field.");
            return;
        }
        onOpen();
    };


    const handleResetAndRedirect = () => {
        setTitle('');
        setDeadline(null);
        useCreateForm.setState({ fields: [], title: '', deadline: null });

        setSelectedStudentIds(new Set([]));
        router.push('/dashboard');
    };

    const handleFinalSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Session expired. Please login again.");
            return;
        }

        setIsSaving(true);
        const formData = {
            title,
            deadline,
            fields: buildJsonSchema().fields,
            assigned_students: Array.from(selectedStudentIds)
        };

        try {
            const res = await fetch('http://localhost:8000/asky/post/forms', {
                method: 'POST',
                headers: {
                    'Authorization': `Asky ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                toast.success(result.msg || "Form created successfully!");
                onOpenChange();
                handleResetAndRedirect();
            } else {
                throw new Error(result.msg || "Failed to save form");
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Header headerTitle="Create Form" />

            <div className="flex justify-center relative">
                <div className="flex w-full justify-between absolute">
                    <DateInput
                        granularity="second"
                        size='sm'
                        label="Dead Line"
                        onChange={(v) => setDeadline(v?.toString() ?? null)}
                    />

                    <button
                        className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-medium"
                        onClick={addField}
                    >
                        <Plus size={18} /> Add Field New
                    </button>
                </div>

                <div className="w-full md:w-[550px] mt-20 flex flex-col gap-4">
                    <Input
                        placeholder="Form Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className='flex flex-col gap-4 h-[calc(100vh-240px)] overflow-y-scroll scrollbar-hide'>
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 flex flex-col gap-3 bg-primary-100 rounded-xl shadow-md mx-1">
                                <Input
                                    isRequired
                                    startContent={<Type size={16} />}
                                    placeholder="Field Label"
                                    value={field.label}
                                    onChange={(e) => updateField(index, 'label', e.target.value)}
                                />

                                <Select
                                    label="Field Type"
                                    placeholder="Select field type"
                                    isRequired
                                    items={fieldTypeOptions}
                                    selectedKeys={[field.type]}
                                    disableSelectorIconRotation
                                    onChange={(key) => updateField(index, 'type', key)}
                                />

                                <div className="flex justify-between items-center gap-3">
                                    <Checkbox
                                        icon={<Asterisk size={12} />}
                                        radius='lg'
                                        isSelected={field.required}
                                        onValueChange={(value: boolean) => updateField(index, 'required', value)}
                                    >
                                        Required
                                    </Checkbox>
                                    <Button size='sm' isIconOnly onPress={() => removeField(index)} className='bg-red-200/70 shadow-none' startContent={<Trash2Icon color='#f00' size={16} />} />
                                </div>
                            </div>
                        ))}

                        <div className="sticky bottom-0 bg-background py-2 z-20">
                            <Button className="w-full bg-primary-600 text-white font-bold py-6 rounded-xl" onPress={handleOpenModal} >
                                Save Form
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Student Selection Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-600">
                                <div className="flex items-center gap-2">
                                    <Users size={20} /> Assign Students
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-gray-500 mb-2">Select the students who need to fill out this form.</p>
                                <HeroSelect
                                    label="Select Students"
                                    selectionMode="multiple"
                                    placeholder="Choose students..."
                                    selectedKeys={selectedStudentIds}
                                    onSelectionChange={(keys) => setSelectedStudentIds(keys as Set<string>)}
                                    variant="bordered"
                                    className="max-w-full"
                                >
                                    {students.map((student) => (
                                        <SelectItem key={student.id} textValue={student.name}>
                                            <div className="flex flex-col">
                                                <span className="text-small font-semibold">{student.name}</span>
                                                <span className="text-tiny text-default-400">{student.email}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </HeroSelect>
                                <div className="mt-2 text-xs text-primary-600 font-medium">
                                    Selected: {selectedStudentIds.size} students
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="light"
                                    onPress={() => {
                                        onClose();
                                        handleResetAndRedirect(); // Redirect and clear on cancel
                                    }}
                                    isDisabled={isSaving}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-primary-600 text-white font-bold"
                                    onPress={handleFinalSave}
                                    isLoading={isSaving}
                                >
                                    {isSaving ? 'Creating...' : 'Confirm & Save'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
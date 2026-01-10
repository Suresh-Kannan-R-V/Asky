/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button, Checkbox, DateInput, Header, Input, Select } from '@components';
import { useCreateForm } from '@store';
import { stat } from 'fs';
import { Asterisk, Plus, Trash2Icon, Type } from 'lucide-react';

const fieldTypeOptions = [
    { key: 'text', label: 'Text' },
    { key: 'number', label: 'Number' },
    { key: 'email', label: 'Email' },
    { key: 'date', label: 'Date' },
];

export default function CreateFormUI() {

    // fields for the Create Form store
    const title = useCreateForm((state) => state.title);
    const fields = useCreateForm((state) => state.fields);

    // functions for the Create Form store
    const setTitle = useCreateForm((state) => state.setTitle);
    const setDeadline = useCreateForm((state) => state.setDeadline);
    const addField = useCreateForm((state) => state.addField);
    const updateField = useCreateForm((state) => state.updateField);
    const buildJsonSchema = useCreateForm((state) => state.buildJsonSchema);
    const removeField = useCreateForm((state) => state.removeField);

    const handleSubmit = () => {
        console.log('JSONB DATA 👉', buildJsonSchema());
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

                    <Button startContent={<Plus />} onPress={addField}>
                        Add Field New
                    </Button>
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
                                    onChange={(e) =>
                                        updateField(index, 'label', e.target.value)
                                    }
                                />

                                <Select
                                    label="Field Type"
                                    placeholder="Select field type"
                                    isRequired
                                    items={fieldTypeOptions}
                                    selectedKeys={[field.type]}
                                    disableSelectorIconRotation
                                    onChange={(key) =>
                                        updateField(index, 'type', key)
                                    }
                                />

                                <div className="flex justify-between items-center gap-3">
                                    <Checkbox
                                        icon={<Asterisk size={12} />}
                                        radius='lg'
                                        checked={field.required}
                                        onChange={(value: boolean) =>
                                            updateField(index, 'required', value)
                                        }
                                    >
                                        Required
                                    </Checkbox>
                                    <Button size='sm' isIconOnly onPress={() => removeField(index)} className='bg-red-200/70 shadow-none' startContent={<Trash2Icon color='#f00' size={16} />} />
                                </div>
                            </div>
                        ))}

                        <div className="sticky bottom-0 bg-background py-2 z-20">
                            <Button className="w-full" onPress={handleSubmit} >
                                Save Form
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

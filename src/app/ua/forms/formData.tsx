'use client';

import { Button, Header, Input } from '@components';
import { useFormDataStore } from '@store';

const formSchema = {
    title: 'College Name Form',
    deadline: '2026-01-21T12:00:00',
    fields: [
        { id: 'f1', label: 'Name', type: 'text', required: true },
        { id: 'f2', label: 'E mail', type: 'email', required: true },
        { id: 'f3', label: 'Phone Number', type: 'number', required: true },
        { id: 'f4', label: 'Remarks', type: 'text', required: false },
    ],
};

export default function FormDataUI() {
    const formData = useFormDataStore((state) => state.formData);
    const setFieldValue = useFormDataStore((state) => state.setFieldValue);
    const resetForm = useFormDataStore((state) => state.resetForm);

    const handleSubmit = () => {
        console.log('SUBMITTED DATA 👉', formData);

        /*
          Example payload to backend:
          {
            form_id: "xyz",
            response_data: formData
          }
        */

        resetForm();
    };

    return (
        <div className="flex flex-col gap-3">
            <Header headerTitle="Fill Forms" />
            <div className="flex flex-col gap-4 justify-center items-center">

                <div className='flex justify-between items-center bg-white py-3 px-4 rounded-xl shadow-md w-full'>
                    <p className='text-primary-500 text-2xl font-semibold'>{formSchema.title}</p>
                    <p className='text-danger-400 text-sm'>{formSchema.deadline}</p>
                </div>

                <div className="relative flex flex-col gap-4 w-[560px] h-[calc(100vh-185px)] overflow-y-scroll scrollbar-hide px-1 pb-14 mt-3">
                    {formSchema.fields.map((field) => (
                        <div key={field.id} className='bg-white p-4 rounded-xl shadow-md'>
                            <Input
                                label={field.label}
                                type={field.type}
                                isRequired={field.required}
                                placeholder={`Enter ${field.label}`}
                                value={formData[field.id] ?? ''}
                                onChange={(e) =>
                                    setFieldValue(field.id, e.target.value)
                                }
                                classNames={{
                                    inputWrapper: 'bg-transparent border-b-2 border-primary-500',
                                    innerWrapper: 'bg-transparent',
                                    input: 'bg-white',
                                }}
                                className=''
                                variant='underlined'
                                labelPlacement='outside'
                            />
                        </div>
                    ))}

                    <div className="absolute w-full left-0 bottom-0 bg-background py-2 z-20">
                        <Button className="w-full" onPress={handleSubmit} >
                            Submit Form
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
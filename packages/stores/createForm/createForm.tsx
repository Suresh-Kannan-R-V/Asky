import { StateCreator } from 'zustand';
import { CreateFormSliceTypes } from './types';

export const CreateFormSlice: StateCreator<CreateFormSliceTypes> = (set, get) => ({
    title: '',
    deadline: null,
    fields: [],

    setTitle: (title) => set({ title }),

    setDeadline: (deadline) => set({ deadline }),

    addField: () =>
        set((state) => ({
            fields: [
                ...state.fields,
                {
                    id: `f${state.fields.length + 1}`,
                    label: '',
                    type: 'text',
                    required: false,
                },
            ],
        })),

    updateField: (index, key, value) =>
        set((state) => {
            const fields = [...state.fields];
            fields[index] = { ...fields[index], [key]: value };
            return { fields };
        }),

    buildJsonSchema: () => {
        const { title, deadline, fields } = get();
        return { title, deadline, fields };
    },

    removeField: (index: number) =>
        set((state) => ({
            fields: state.fields.filter((_, i) => i !== index),
        })),
});

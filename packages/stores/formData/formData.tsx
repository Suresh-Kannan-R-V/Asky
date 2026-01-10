import { StateCreator } from 'zustand';
import { FormDataStoreSliceTypes } from './types';

export const FormDataStoreSlice: StateCreator<FormDataStoreSliceTypes> = (set) => ({
    formData: {},

    setFieldValue: (fieldId, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [fieldId]: value,
            },
        })),

    resetForm: () =>
        set(() => ({
            formData: {},
        })),
});

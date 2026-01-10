import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FormDataStoreSlice } from './formData';
import { FormDataStoreProps } from './types';

export const useFormDataStore = create<FormDataStoreProps>()(
    immer((...a) => ({
        ...FormDataStoreSlice(...a),
    })),
);

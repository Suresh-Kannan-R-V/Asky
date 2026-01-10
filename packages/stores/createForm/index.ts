import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CreateFormSlice } from './createForm';
import { CreateFormProps } from './types';

export const useCreateForm = create<CreateFormProps>()(
    immer((...a) => ({
        ...CreateFormSlice(...a),
    })),
);

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CommonStoreProps } from './types';
import { CommonStoreSlice } from './CommonSlice';

export const useCommonStore = create<CommonStoreProps>()(
    immer((...a) => ({
        ...CommonStoreSlice(...a),
    })),
);

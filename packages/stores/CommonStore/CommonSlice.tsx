import { StateCreator } from 'zustand';
import { CommonStoreSliceTypes } from './types';

export const CommonStoreSlice: StateCreator<CommonStoreSliceTypes> = (set) => ({
    isOpen: true,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    setIsOpen: (isOpen) => set({ isOpen: isOpen }),
});

import { StateCreator } from 'zustand';
import { CommonStoreSliceTypes } from './types';

export const CommonStoreSlice: StateCreator<CommonStoreSliceTypes> = (set) => ({
    isOpen: true,
    cardDropdownOpen: true,
    role: "",
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    setIsOpen: (isOpen) => set({ isOpen: isOpen }),
    setRole: (role) => set({ role: role }),
});

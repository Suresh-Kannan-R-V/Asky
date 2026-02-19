export interface CommonStoreProps {
  cardDropdownOpen: boolean;
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
  role: string;
  setRole: (role:string) => void;
}

export type CommonStoreSliceTypes = CommonStoreProps;

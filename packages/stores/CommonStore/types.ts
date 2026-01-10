export interface CommonStoreProps {
  cardDropdownOpen: boolean;
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export type CommonStoreSliceTypes = CommonStoreProps;

export interface FormDataStoreProps {
  formData: Record<string, string>;
  setFieldValue: (fieldId: string, value: string) => void;
  resetForm: () => void;
}

export type FormDataStoreSliceTypes = FormDataStoreProps;

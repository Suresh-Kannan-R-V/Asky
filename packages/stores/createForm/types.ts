export type FieldType = 'text' | 'number' | 'email' | 'date';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}

export interface CreateFormProps {
  title: string;
  deadline: string | null;
  fields: FormField[];

  setTitle: (title: string) => void;
  setDeadline: (date: string | null) => void;
  addField: () => void;
  updateField: (
    index: number,
    key: keyof FormField,
    value: string | boolean
  ) => void;

  buildJsonSchema: () => Record<string, unknown>;
  removeField: (index: number) => void;
}


export type CreateFormSliceTypes = CreateFormProps;

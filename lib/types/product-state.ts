
type FieldErrors = Record<string, string[]>;
type FormValues = Record<string, string>;

interface BaseFormState {
  success: boolean;
  message?: string | null;
  errors?: FieldErrors;
  values?: FormValues;
}

export type CreateProductState = BaseFormState;
export type UpdateProductState = BaseFormState;


export type DeleteActionState = {
  success: boolean;
  message: string | null;
  errors?: Record<string, string[]>;
};

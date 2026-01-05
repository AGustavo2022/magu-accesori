
// export type CreateProductState = {
//   success: boolean;
//   message?: string | null;
//   errors: CreateProductErrors;
//   values: Record<string, string>;
// };

// export type CreateProductErrors = {
//   title?: string[];
//   shortDescription?: string[];
//   longDescription?: string[];
//   price?: string[];
//   stock?: string[];
//   image_url?: string[];
//   category?: string[];
//   subcategory?: string[];
//   discount?: string[];
// };

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

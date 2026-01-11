
// type FieldErrors = Record<string, string[]>;
// type FormValues = Record<string, string>;

// interface BaseFormState {
//   success: boolean;
//   message?: string | null;
//   errors?: FieldErrors;
//   values?: FormValues;
// }

// export type CreateProductState = BaseFormState;
// export type UpdateProductState = BaseFormState;


// export type DeleteActionState = {
//   success: boolean;
//   message: string | null;
//   errors?: Record<string, string[]>;
// };

type FieldErrors = Record<string, string[]>
type FormValues = Record<string, string>

type SuccessState = {
  success: true
  message?: string | null
}

type ErrorState = {
  success: false
  message?: string | null
  errors: FieldErrors
  values: FormValues
}

export type CreateProductState = SuccessState | ErrorState
export type UpdateProductState = SuccessState | ErrorState


type DeleteSuccess = {
  success: true
  message: string | null
}

type DeleteError = {
  success: false
  message: string | null
  errors: Record<string, string[]>
}

export type DeleteActionState = DeleteSuccess | DeleteError

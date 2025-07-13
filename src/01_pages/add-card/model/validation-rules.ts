import { field } from "src/05_shared/api/card/types";
import { Field } from "src/05_shared/api/field/types";

type errorType = "EMPTY_NAME" | "TYPE_MISMATCH" | "INVALID_VALUE" | "OTHER";
export type ValidationError = {
  fieldIndex: number;
  fieldName: string;
  errorType: errorType;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

export type ValidationRule = {
  condition: (field: field, allFields: Field[]) => boolean;
  error: {
    errorType: errorType;
    message: string;
  };
};

export const fieldValidationRules: ValidationRule[] = [
  {
    condition: (field: field) => field.name.trim() === "",
    error: {
      errorType: "EMPTY_NAME",
      message: "Field name cannot be empty",
    },
  },
];

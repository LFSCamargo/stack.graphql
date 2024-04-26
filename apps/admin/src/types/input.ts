import { FieldError, UseFormRegister } from "react-hook-form";

export type FormFieldProps = {
  id: string;
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

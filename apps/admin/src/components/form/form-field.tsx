import { FormFieldProps } from "@/types";
import { Input } from "../ui";

export const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  ...props
}) => (
  <>
    <Input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      {...props}
    />
    {error && (
      <span className="mb-1 text-xs text-red-500">{error.message}</span>
    )}
  </>
);

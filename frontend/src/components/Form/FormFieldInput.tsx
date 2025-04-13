import { ErrorText } from "../ErrorText/ErrorText.styled";
import { FieldInput, FormLabel } from "./FormField.styled";

type FormFieldProps = {
  value: string;
  inputType?: string;
  label: string;
  setValueFn: React.Dispatch<React.SetStateAction<any>>;
  children?: React.ReactNode;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
}

export const FormFieldInput = ({
  value,
  inputType = 'text',
  label,
  setValueFn,
  children,
  placeholder,
  isError,
  errorMessage,
}: FormFieldProps) => {
  const inputElemId = `input-${label}-${inputType}`;
  
  return (
    <div>
      <FormLabel htmlFor={inputElemId}>
        {label}
      </FormLabel>
      <FieldInput
        id={inputElemId}
        type={inputType}
        value={value}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValueFn(e.target.value);
        }}
        placeholder={placeholder}
        $hasChildren={Boolean(children)}
      />
      {children}
      {isError && (
        <ErrorText>{errorMessage}</ErrorText>
      )}
    </div>
  )
};
import { ErrorText } from "../ErrorText/ErrorText.styled";
import { FieldTextArea, FieldTextAreaLength, FormLabel } from "./FormField.styled";
import { NoteText } from "../NoteText/NoteText.styled";

type FormFieldProps = {
  value: string;
  label: string;
  setValueFn: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  maxLength: number;
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
}

export const FormFieldTextArea = ({
  value,
  label,
  setValueFn,
  placeholder,
  isError,
  errorMessage,
  maxLength,
  length,
  setLength,
}: FormFieldProps) => {
  const inputElemId = `textarea-${label}`;
  
  return (
    <>
      <FormLabel htmlFor={inputElemId}>
        {label}
      </FormLabel>
      <FieldTextArea
        id={inputElemId}
        value={value}
        onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const isMaximumExceeded = length >= maxLength;
          const newValueSmallerThanPevious = e.target.value.length < value.length;

          if (
            (isMaximumExceeded && newValueSmallerThanPevious) ||
            !isMaximumExceeded
          ) {
            setValueFn(e.target.value);
            setLength(e.target.value?.length)
          }
        }}
        placeholder={placeholder}
      />
      <FieldTextAreaLength>{length}/{maxLength}</FieldTextAreaLength>
      {length! > maxLength && (
        <ErrorText>Вы превышаете максимальное количество символов</ErrorText>
      )}
      {length === maxLength && (
        <NoteText>Вы достигли максимального количества символов</NoteText>
      )} 
      {isError && (
        <ErrorText>{errorMessage}</ErrorText>
      )}
    </>
  )
};
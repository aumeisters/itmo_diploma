import Button from "@mui/material/Button";
import { FormEvent } from "react";
import { ButtonWrapper } from "./FormButtons.styled";

type FormButtonsProps = {
  isResetDisabled: boolean;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
  submitText: string,
  isSumbitDisabled: boolean;
}

export const FormButtons = ({
  isResetDisabled,
  handleSubmit,
  handleReset,
  submitText,
  isSumbitDisabled,
}: FormButtonsProps) => (
  <ButtonWrapper>
    <Button
      variant="contained"
      type='submit'
      onClick={handleSubmit}
      disabled={isSumbitDisabled}
    >
      {submitText}
    </Button>
    <Button
      variant="contained"
      type="reset"
      onClick={handleReset}
      disabled={isResetDisabled}
    >
      Сброс
    </Button>
  </ButtonWrapper>
)
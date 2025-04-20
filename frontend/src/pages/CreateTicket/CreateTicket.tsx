import { FormEvent, useEffect, useState } from "react";
import { FormWrapper } from "../../components/Form/Form.styled";
import { FormFieldInput } from "../../components/Form/FormFieldInput";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import { useNavigate } from "react-router-dom";
import { Path } from "../../router";
import { FormButtons } from "../../components/Form/FormButtons";
import { validateObjectValues } from "../../utils/validateObjectValues";
import { createTicket } from "../../api";
import { Navigation } from "../../components/Navigation/Navigation";
import { FormFieldTextArea } from "../../components/Form/FormTextArea";
import { AuthValidator } from "../../components/AuthValidator/AuthValidator";
import { ErrorContactSupport } from "../../components/ErrorContactSupport/ErrorContactSupport";
import { Title } from "../../components/Title/Title.styled";

type FormData = {
  title: string;
  issue: string;
}

const defaultFormData: FormData = {
  title: '',
  issue: '',
}

const MAX_ALLOWED_ISSUE_LENGHT = 500;

export const CreateTicket = () => {
  const [length, setLength] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    title,
    issue,
  } = formData;

  useEffect(() => {
    setIsError(false);
  }, [formData])

  const navigate = useNavigate();
  const isIssueLengthExceeded = length > MAX_ALLOWED_ISSUE_LENGHT;
  
  const handleLoginClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (validateObjectValues(formData) && !isIssueLengthExceeded) {
        setIsSendingData(true);
        await createTicket(formData)
        setIsSendingData(false);
        navigate(Path.MAIN)
      } else {
        setIsError(true)
      }
    } catch (error) {
      setIsSendingData(false);
      setIsError(true);
    }
  };

  const handleResetButton = () => {
    setFormData(defaultFormData);
    setIsError(false);
    setLength(0);
  };

  const isMissingTitle = isError && !title;
  const isMissingIssue = isError && !issue;

  const isApiError = isError && validateObjectValues(formData) && !isIssueLengthExceeded;

  const setTitle = (title: string) => setFormData(data => ({
    ...data,
    title,
  }));

  const setIssue = (issue: string) => setFormData(data => ({
    ...data,
    issue,
  }));

  return (
    <AuthValidator>
      <Navigation />
      <Wrapper $mrgt={2} $maxw={30} $shdw $bdrr>
        <Title>Пожалуйста опишите проблему</Title>
        <FormWrapper> 
          <FormFieldInput
            value={title}
            setValueFn={setTitle}
            label='Название проблемы'
            placeholder="Пожалуйста введите название проблемы"
            isError={isMissingTitle}
            errorMessage="Название проблемы обязательно"
          />
          <FormFieldTextArea
            value={issue}
            setValueFn={setIssue}
            label='Проблема'
            placeholder="Пожалуйста опишите вашу проблему"
            isError={isMissingIssue}
            errorMessage="Описание проблемы обязательно"
            maxLength={MAX_ALLOWED_ISSUE_LENGHT}
            length={length}
            setLength={setLength}
            height={10}
          />
          {isApiError && <ErrorContactSupport />}
          <FormButtons
            disabled={isSendingData}
            isSumbitDisabled={isSendingData || isError || isIssueLengthExceeded}
            handleSubmit={handleLoginClick}
            handleReset={handleResetButton}
            submitText="Создать"
          />
          </FormWrapper>
      </Wrapper>
    </AuthValidator>
  );
};

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
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { APP_ISSUES } from "../../config";

type FormData = {
  title: string;
  issue: string;
}

const defaultFormData: FormData = {
  title: '',
  issue: '',
}

const MAX_ALLOWED_ISSUE_LENGHT = 500;

const NOT_IN_THE_LIST = 'NOT_IN_THE_LIST';

export const CreateTicket = () => {
  const [length, setLength] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [shouldShowCustomIssueTitle, setShouldShowCustomIssueTitle] = useState<boolean>(false);

  const {
    title,
    issue,
  } = formData;

  useEffect(() => {
    setIsError(false);
  }, [formData])

  const navigate = useNavigate();
  const isIssueLengthExceeded = length > MAX_ALLOWED_ISSUE_LENGHT;
  
  const handleSubmit = async (e: FormEvent) => {
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

  const handleIssueSelect = (e: SelectChangeEvent) => {
    const selectedIssue = e.target.value;

    if (selectedIssue === NOT_IN_THE_LIST) {
      setShouldShowCustomIssueTitle(true);
    }

    if (selectedIssue !== NOT_IN_THE_LIST) {
      setShouldShowCustomIssueTitle(false);
      setTitle(selectedIssue);
    }   
  }

  return (
    <AuthValidator>
      <Navigation />
      <Wrapper $mrgt={2} $maxw={30} $shdw $bdrr>
        <Title>Пожалуйста, опишите проблему</Title>
        <FormWrapper> 
          <FormControl sx={{ marginTop: '1rem', verticalAlign: 'middle' }} size="small">
            <Select
              onChange={handleIssueSelect}
              disabled={isError || isSendingData}
              defaultValue={'defaultValue'}
            >
              <MenuItem value='defaultValue' disabled>Выберите проблему из выпадающего списка</MenuItem>
              {APP_ISSUES && (JSON.parse(APP_ISSUES)).map((
                issue: string,
              ) => (
                <MenuItem value={issue}>
                  {issue}
                </MenuItem>
              ))}
              <MenuItem value={NOT_IN_THE_LIST}>Нет в списке</MenuItem>
            </Select>
          </FormControl>
          {shouldShowCustomIssueTitle && (
            <FormFieldInput
              value={title}
              setValueFn={setTitle}
              label='Название проблемы'
              placeholder="Введите название проблемы"
              isError={isMissingTitle}
              errorMessage="Название проблемы обязательно"
            />
          )}
          <FormFieldTextArea
            value={issue}
            setValueFn={setIssue}
            label='Проблема'
            placeholder="Опишите вашу проблему"
            isError={isMissingIssue}
            errorMessage="Описание проблемы обязательно"
            maxLength={MAX_ALLOWED_ISSUE_LENGHT}
            length={length}
            setLength={setLength}
            height={10}
          />
          {isApiError && <ErrorContactSupport />}
          <FormButtons
            isResetDisabled={isSendingData}
            isSumbitDisabled={isSendingData || isError || isIssueLengthExceeded || !validateObjectValues(formData)}
            handleSubmit={handleSubmit}
            handleReset={handleResetButton}
            submitText="Создать"
          />
          </FormWrapper>
      </Wrapper>
    </AuthValidator>
  );
};

import { FormEvent, useEffect, useState } from "react";
import { FormFieldWrapper, FormWrapper } from "../../components/Form/Form.styled";
import { FormFieldInput } from "../../components/Form/FormFieldInput";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import { useNavigate } from "react-router-dom";
import { Path } from "../../router";
import { FormVisibilityButton } from "../../components/Form/FormVisibilityButton";
import { FormButtons } from "../../components/Form/FormButtons";
import { CreateAccountWrapper } from "../Login/Login.styled";
import  Link  from "@mui/material/Link";
import { PasswordInputTypes } from "../../components/Form/PasswordInput.type";
import { validateObjectValues } from "../../utils/validateObjectValues";
import { createAccount } from "../../api";
import { ErrorText } from "../../components/ErrorText/ErrorText.styled";
import { ErrorContactSupport } from "../../components/ErrorContactSupport/ErrorContactSupport";
import { Title } from "../../components/Title/Title.styled";

type FormData = {
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const defaultFormData: FormData = {
  firstname: '',
  lastname: '',
  dateOfBirth: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export const CreateAccount = () => {
  const [passwordType, setPasswordType] = useState<PasswordInputTypes>(PasswordInputTypes.PASSWORD);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    firstname,
    lastname,
    dateOfBirth,
    email,
    password,
    repeatPassword,
  } = formData;

  useEffect(() => {
    setIsError(false);
  }, [formData])

  const navigate = useNavigate();
  const passwordIsHidden = passwordType === PasswordInputTypes.PASSWORD;

  const showPassword = () => {
    if (passwordIsHidden) {
      setPasswordType(PasswordInputTypes.TEXT);
    } else {
      setPasswordType(PasswordInputTypes.PASSWORD);
    }
  };

  const checkIfPasswordsMatch = () => {
    return password && repeatPassword && (repeatPassword === password);
  }
  
  const handleLoginClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (validateObjectValues(formData) && checkIfPasswordsMatch()) {
        setIsSendingData(true);
        const { repeatPassword, ...data } = formData;

        await createAccount(data)
        setIsSendingData(false);
        navigate(Path.LOGIN)
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
  };

  const isMissingEmail = isError && !email;
  const isMissingPassword = isError && !password;
  const isMissingRepeatPassword = isError && !repeatPassword;
  const isMissingName = isError && !firstname;
  const isMissingSurname = isError && !lastname;
  const isMissingDateOfBirth = isError && !dateOfBirth;
  const isPasswordDoesNotMatchError = isError && !checkIfPasswordsMatch();

  const isApiError = isError && validateObjectValues(formData) && checkIfPasswordsMatch();

  const setFirstname = (firstname: string) => setFormData(data => ({
    ...data,
    firstname,
  }));

  const setLastname = (lastname: string) => setFormData(data => ({
    ...data,
    lastname,
  }));

  const setDateOfBirth = (dateOfBirth: string) => setFormData(data => ({
    ...data,
    dateOfBirth,
  }));

  const setEmail = (email: string) => setFormData(data => ({
    ...data,
    email,
  }));

  const setPasswod = (password: string) => setFormData(data => ({
    ...data,
    password,
  }));
  
  const setRepeatPassword = (repeatPassword: string) => setFormData(data => ({
    ...data,
    repeatPassword,
  }));

  return (
    <Wrapper $mrgt={2} $maxw={30} $shdw $bdrr>
      <Title>Пожалуйста предоставьте данные для новой учетной записи</Title>
      <FormWrapper> 
        <FormFieldWrapper>
          <FormFieldInput
            value={firstname}
            setValueFn={setFirstname}
            label='Имя'
            placeholder="Пожалуйста введите ваше имя"
            isError={isMissingName}
            errorMessage="Имя обязательно"
          />
          <FormFieldInput
            value={lastname}
            setValueFn={setLastname}
            label='Фамилия'
            placeholder="Пожалуйста введите вашу фамилию"
            isError={isMissingSurname}
            errorMessage="Фамилия обязательна"
          />
          <FormFieldInput
            inputType='email'
            value={email}
            setValueFn={setEmail}
            label='Имейл'
            placeholder="Пожалуйста введите ваш имейл"
            isError={isMissingEmail}
            errorMessage="Имейл обязателен"
          />
          <FormFieldInput
            inputType={passwordType}
            value={password}
            setValueFn={setPasswod}
            label='Пароль'
            placeholder="Пожалуйста введите ваш пароль"
            isError={isMissingPassword}
            errorMessage="Пароль обязателен"
          >
            <FormVisibilityButton
              toggleVisibility={showPassword}
              visibilityOff={passwordIsHidden}
            />
          </FormFieldInput>
          <FormFieldInput
            inputType={passwordType}
            value={repeatPassword}
            setValueFn={setRepeatPassword}
            label='Повторно пароль'
            placeholder="Пожалуйста введите ваш пароль повторно"
            isError={isMissingRepeatPassword}
            errorMessage="Повторный пароль обязателен"
          >
            <FormVisibilityButton
              toggleVisibility={showPassword}
              visibilityOff={passwordIsHidden}
            />
          </FormFieldInput>
          <FormFieldInput
            inputType='date'
            value={dateOfBirth ?? ''}
            setValueFn={setDateOfBirth}
            label='Дата рождения'
            placeholder="Пожалуйста введите вашу дату рождения"
            isError={isMissingDateOfBirth}
            errorMessage="Дата рождения обязательна"
          />
          {isApiError && <ErrorContactSupport />}
          {isPasswordDoesNotMatchError && (
            <ErrorText>
              Введенные пароли не совпадают
            </ErrorText>
          )}
        </FormFieldWrapper>
        <FormButtons
          disabled={isSendingData}
          isSumbitDisabled={isSendingData || isError}
          handleSubmit={handleLoginClick}
          handleReset={handleResetButton}
          submitText="Создать"
        />
      </FormWrapper>
      <CreateAccountWrapper>
        <Link href='/login' underline="none">Логин</Link>
      </CreateAccountWrapper>
    </Wrapper>
  );
};

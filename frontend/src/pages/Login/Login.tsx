import { FormEvent, useEffect, useState } from "react";
import { CreateAccountWrapper } from "./Login.styled";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { Path } from "../../router";
import { FormWrapper } from "../../components/Form/Form.styled";
import { FormFieldInput } from "../../components/Form/FormFieldInput";
import { FormButtons } from "../../components/Form/FormButtons";
import { FormVisibilityButton } from "../../components/Form/FormVisibilityButton";
import  Link  from "@mui/material/Link";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import { ErrorText } from "../../components/ErrorText/ErrorText.styled";
import { PasswordInputTypes } from "../../components/Form/PasswordInput.type";
import { validateObjectValues } from "../../utils/validateObjectValues";
import { ErrorContactSupport } from "../../components/ErrorContactSupport/ErrorContactSupport";


type FormData = {
  email: string;
  password: string;
}

const defaultFormData: FormData = {
  email: '',
  password: ''
};

export const Login = () => {
  const [passwordType, setPasswordType] = useState<PasswordInputTypes>(PasswordInputTypes.PASSWORD);
  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { email, password } = formData;

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

  const handleLoginClick = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (validateObjectValues(formData)) {
        setIsSendingData(true);
        await login(formData)
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
  };

  const isMissingEmail = isError && !email;
  const isMissingPassword = isError && !password;
  const isApiError = isError && email && password;

  const setEmail = (email: string) => setFormData(data => ({
    ...data,
    email,
  }));

  const setPasswod = (password: string) => setFormData(data => ({
    ...data,
    password,
  }));

  return (
    <Wrapper $mrgt={10} $maxw={20} $shdw $bdrr>
      <h2>Пожалуйста введите свои данные логина</h2>
      <FormWrapper>
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
        {isApiError && <ErrorContactSupport />}
        <FormButtons
          disabled={isSendingData}
          isSumbitDisabled={isSendingData || isError}
          handleSubmit={handleLoginClick}
          handleReset={handleResetButton}
          submitText="Логин"
        />
      </FormWrapper>
      <CreateAccountWrapper>
        <Link href='/create-account' underline="none">Зарегистрироваться</Link>
      </CreateAccountWrapper>
    </Wrapper>
  );
};

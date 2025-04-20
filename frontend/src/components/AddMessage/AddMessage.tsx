import { FormEvent, useState } from "react";
import { FormWrapper } from "../Form/Form.styled";
import { FormFieldTextArea } from "../Form/FormTextArea";
import { FormButtons } from "../Form/FormButtons";
import { createMessage } from "../../api";

const MAX_ALLOWED_MESSAGE_LENGHT = 500;

type AddMessageProps = {
  ticketId?: number;
  disabled: boolean;
  refetch: () => void;
};

export const AddMessage = ({
  ticketId,
  disabled,
  refetch,
}: AddMessageProps) => {
  const [message, setMessage] = useState<string>('');
  const [length, setLength] = useState<number>(0)
  const [isError, setIsError] = useState<boolean>(false);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (message.length && ticketId) {
        setIsSendingData(true);
        await createMessage({
          ticketId,
          message,
        })
        setIsSendingData(false);
        handleReset();
        refetch();
      } else {
        setIsError(true)
      }
    } catch (error) {
      setIsSendingData(false);
      setIsError(true);
    }
  };  

  const handleReset = () => {
    setMessage('');
    setIsError(false);
    setLength(0);
  };

  return (
    <FormWrapper> 
      <FormFieldTextArea
        value={message}
        setValueFn={setMessage}
        label='Новое сообщение'
        placeholder="Напишите здесь ваше сообщение"
        isError={isError}
        errorMessage="Нельзя отправить пустое сообщение"
        maxLength={MAX_ALLOWED_MESSAGE_LENGHT}
        length={length}
        setLength={setLength}
      />
      <FormButtons
        disabled={isSendingData}
        isSumbitDisabled={isSendingData || isError || disabled}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        submitText="Создать"
      />
    </FormWrapper>
  )
}
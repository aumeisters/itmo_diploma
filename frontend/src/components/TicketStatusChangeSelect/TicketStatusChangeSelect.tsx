import { useState } from "react";
import { TicketStatus, updateTicketStatus } from "../../api"
import { ErrorText } from "../ErrorText/ErrorText.styled";

type TicketStatusChangeSelectProps = {
  disabled: boolean;
  ticketId?: number;
  currectTicketStatus: TicketStatus;
}

export const TicketStatusChangeSelect = ({
  disabled,
  ticketId,
  currectTicketStatus,
}: TicketStatusChangeSelectProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
  
  const handleStatusChange = async (e: any) => {
    const newStatus = e.target.value;

    if (ticketId) {
      setIsLoading(true)
      try {
        await updateTicketStatus({ ticketId, newStatus });
        window.location.reload();
      } catch (error: any) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      };
    }
  }

  return (
    <>
      <select
        onChange={handleStatusChange}
        disabled={disabled || isLoading}
        defaultValue={currectTicketStatus}
      >
        <option value={TicketStatus.CREATED}>{TicketStatus.CREATED}</option>
        <option value={TicketStatus.PENDING}>{TicketStatus.PENDING}</option>
        <option value={TicketStatus.RESOLVED}>{TicketStatus.RESOLVED}</option>
        <option value={TicketStatus.CLOSED}>{TicketStatus.CLOSED}</option>
      </select>

      {isError && (
        <div>
          <ErrorText>Возникла ошибка при обновлении статуса тикета</ErrorText>
        </div>
      )}
    </>
  )
}

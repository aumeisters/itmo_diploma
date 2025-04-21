import { useState } from "react";
import { TicketStatus, updateTicketStatus } from "../../api"
import { ErrorText } from "../ErrorText/ErrorText.styled";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

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
  
  const handleStatusChange = async (e: SelectChangeEvent) => {
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
      <FormControl sx={{ verticalAlign: 'middle' }} size="small">
        <Select
          onChange={handleStatusChange}
          disabled={disabled || isLoading}
          defaultValue={currectTicketStatus}
        >
          <MenuItem value={TicketStatus.CREATED}>{TicketStatus.CREATED}</MenuItem>
          <MenuItem value={TicketStatus.PENDING}>{TicketStatus.PENDING}</MenuItem>
          <MenuItem value={TicketStatus.RESOLVED}>{TicketStatus.RESOLVED}</MenuItem>
          <MenuItem value={TicketStatus.CLOSED}>{TicketStatus.CLOSED}</MenuItem>
        </Select>
      </FormControl>
      {isError && (
        <div>
          <ErrorText>Возникла ошибка при обновлении статуса тикета</ErrorText>
        </div>
      )}
    </>
  )
}

import { useParams } from "react-router-dom";
import { AuthValidator } from "../../components/AuthValidator/AuthValidator";
import { Navigation } from "../../components/Navigation/Navigation";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import { useEffect, useState } from "react";
import { fetchTicket, Ticket } from "../../api";
import { Loader } from "../../components/Loader/Loader.styled";
import { ErrorContactSupport } from "../../components/ErrorContactSupport/ErrorContactSupport";
import { TicketStatusBadge } from "../../components/TicketStatusBadge/TicketStatusBadge.styled";
import { parseDate } from "../../utils/prepareDate";
import { Issue, TicketViewRow, TicketViewWrapper } from "./TicketView.styled";

export const TicketView = () => {
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  let { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      
      if (id) {
        try {
          const ticket = await fetchTicket(Number(id));
          setTicket(ticket);
        } catch (error: any) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        };
      }
    })()
  }, [id]);

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <AuthValidator>
      <Navigation />
      <Wrapper $maxw={100}>
        {ticket && (
          <TicketViewWrapper>
            <TicketViewRow>
              <span>Проблема:&nbsp;</span>
              {ticket.title}
            </TicketViewRow>
            <TicketViewRow>
              <span>Дата создания:&nbsp;</span>
              {parseDate(ticket.createdAt)}
            </TicketViewRow>
            <TicketViewRow>
              <span>Описание проблемы:&nbsp;</span>
              <Issue>
                {ticket.issue}
              </Issue>
            </TicketViewRow>
            <TicketViewRow>
              <span>Статус:&nbsp;</span>
              <TicketStatusBadge $status={ticket.status}>
                {ticket.status}
              </TicketStatusBadge>
            </TicketViewRow>
          </TicketViewWrapper>
        )}
        {isError && <ErrorContactSupport />}
      </Wrapper>
    </AuthValidator>
  )
}
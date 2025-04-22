import { useParams } from "react-router-dom";
import { AuthValidator } from "../../components/AuthValidator/AuthValidator";
import { Navigation } from "../../components/Navigation/Navigation";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import { useCallback, useEffect, useState } from "react";
import { fetchTicket, Ticket } from "../../api";
import { Loader } from "../../components/Loader/Loader.styled";
import { ErrorContactSupport } from "../../components/ErrorContactSupport/ErrorContactSupport";
import { TicketStatusBadge } from "../../components/TicketStatusBadge/TicketStatusBadge.styled";
import { parseDatetime } from "../../utils/prepareDate";
import { Issue, TicketViewWrapper } from "./TicketView.styled";
import { MessageList } from "../../components/MessageList/MessageList";
import { AddMessage } from "../../components/AddMessage/AddMessage";
import { isAdminUser } from "../../utils/storageHelper";
import { TicketStatusChangeSelect } from "../../components/TicketStatusChangeSelect/TicketStatusChangeSelect";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper.styled";
import { TicketInfoRow } from "./TicketInfoRow";
import Link from "@mui/material/Link";
import { Path } from "../../router";

export const TicketView = () => {
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const isAdmin = isAdminUser();

  let { id } = useParams();

  const getTickets = useCallback(async () => {
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
  }, [id])

  useEffect(() => {
    (async () => await getTickets())();
  }, [getTickets]);

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <AuthValidator>
      <Navigation />
      <PageWrapper>
        <Wrapper $maxw={100}>
          {ticket && (
            <TicketViewWrapper>
              {isAdmin && (
                <TicketInfoRow title="Автор">
                  <Link
                    href={Path.getUserPage(ticket.requester.id)}
                    underline="none"
                  >
                    {ticket.requester.firstname} {ticket.requester.lastname}
                  </Link>
                </TicketInfoRow>
              )}
              <TicketInfoRow title="Проблема">
                {ticket.title}
              </TicketInfoRow>
              <TicketInfoRow title="Дата создания">
                {parseDatetime(ticket.createdAt)}
              </TicketInfoRow>
              <TicketInfoRow title="Описание проблемы">
                <Issue>{ticket.issue} </Issue>
              </TicketInfoRow>
              <TicketInfoRow title="Статус">
                {isAdmin ? (
                  <TicketStatusChangeSelect
                    disabled={isLoading || isError}
                    ticketId={Number(id)}
                    currectTicketStatus={ticket.status}
                  />
                ) : (
                  <TicketStatusBadge $status={ticket.status}>
                    {ticket.status}
                  </TicketStatusBadge>
                )}
              </TicketInfoRow>
            </TicketViewWrapper>
          )}
          {isError && <ErrorContactSupport />}
          <AddMessage
            ticketId={Number(id)}
            disabled={isLoading || isError}
            refetch={getTickets}
          />
          {Boolean(ticket?.messages.length) && <MessageList messages={ticket?.messages} />}
        </Wrapper>
      </PageWrapper>
    </AuthValidator>
  )
}
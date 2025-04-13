import { AuthValidator } from "../../components/AuthValidator/AuthValidator";
import { Navigation } from "../../components/Navigation/Navigation";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import  Link  from "@mui/material/Link";
import {
  TicketCell,
  TicketCellHeader,
  TicketRow,
  TicketTable,
  Title,
} from "./Main.styled";
import { useEffect, useState } from "react";
import { fetchTicketsbyAdmin, Ticket } from "../../api";
import { Loader } from "../../components/Loader/Loader.styled";
import { ErrorText } from "../../components/ErrorText/ErrorText.styled";
import { NoteText } from "../../components/NoteText/NoteText.styled";
import { Path } from "../../router";
import { TicketStatusBadge } from "../../components/TicketStatusBadge/TicketStatusBadge.styled";
import { parseDate } from "../../utils/prepareDate";

export const MainAdminView = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const tickets = await fetchTicketsbyAdmin();
        setTickets(tickets);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <AuthValidator>
      <div>
        <Navigation></Navigation>
        <Wrapper $mrgt={1} $flex $fspb>
          <Title>
            Список тикетов
          </Title>
        </Wrapper>
        {error && (
          <ErrorText>
            {error}
          </ErrorText>
        )}
        <Wrapper>
          <TicketTable>
            <thead>
              <TicketRow>
                <TicketCellHeader>Название тикета</TicketCellHeader>
                <TicketCellHeader>Статус тикета</TicketCellHeader>
                <TicketCellHeader>Дата создания</TicketCellHeader>
                <TicketCellHeader></TicketCellHeader>
              </TicketRow>
            </thead>
            <tbody>
              {Boolean(tickets.length) && tickets.map((ticket: Ticket) => (
                <TicketRow key={ticket.id}>
                  <TicketCell>{ticket.title}</TicketCell>
                  <TicketCell $ctrd>
                    <TicketStatusBadge $status={ticket.status}>
                      {ticket.status}
                    </TicketStatusBadge>
                  </TicketCell>
                  <TicketCell>{parseDate(ticket.createdAt)}</TicketCell>
                  <TicketCell $ctrd>
                    <Link
                      href={Path.getTicketPage(ticket.id)}
                      underline="none"
                    >
                      Открыть
                    </Link>
                  </TicketCell>
                </TicketRow>
              ))}
            </tbody>
          </TicketTable>
          {!tickets.length && (
            <NoteText>Eще не созданно ни одного тикета</NoteText>
          )}
        </Wrapper>
      </div>
    </AuthValidator>
  );
};

import Link from "@mui/material/Link";
import { Ticket } from "../../api";
import { TicketStatusBadge } from "../../components/TicketStatusBadge/TicketStatusBadge.styled";
import { parseDatetime } from "../../utils/prepareDate";
import { TicketCell, TicketCellHeader, TicketRow, TicketTable } from "../Main/Main.styled";
import { Path } from "../../router";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";

type UserTicketsProps = {
  tickets: Ticket[];
}

export const UserTickets = ({
  tickets,
}: UserTicketsProps) => {

  return (
    <Wrapper $mrgt={2}>
      <TicketTable>
        <thead>
          <TicketRow>
            <TicketCellHeader>Название</TicketCellHeader>
            <TicketCellHeader>Статус</TicketCellHeader>
            <TicketCellHeader>Дата создания</TicketCellHeader>
            <TicketCellHeader></TicketCellHeader>
          </TicketRow>
        </thead>
        <tbody>
          {tickets.map((ticket: Ticket) => (
            <TicketRow key={ticket.id}>
              <TicketCell>{ticket.title}</TicketCell>
              <TicketCell $ctrd>
                <TicketStatusBadge $status={ticket.status}>
                  {ticket.status}
                </TicketStatusBadge>
              </TicketCell>
              <TicketCell>{parseDatetime(ticket.createdAt)}</TicketCell>
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
    </Wrapper>
  )
}
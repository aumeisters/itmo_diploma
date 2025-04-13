import styled from "styled-components";
import { TicketStatus } from "../../api";

enum StatusColors {
  CREATED = '#d1ffd3',
  PENDING = '#fad161',
  RESOLVED = '#4b9456',
  CLOSED = '#d9dbd9',
}

export const TicketStatusBadge = styled.span<{
  $status: TicketStatus;
}>`
  padding: 0.2rem 0.4rem;
  border-radius: 1rem;
  ${(props) => `background-color: ${StatusColors[props.$status]};`}
`;

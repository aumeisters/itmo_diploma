import styled from "styled-components";

export const Title = styled.h1`
  font-size: 1.8em;
`;

export const CreateTicketWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 1.5rem;
`;

export const TicketTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TicketRow = styled.tr`

`;

export const TicketCellHeader = styled.th`
  text-align: left;
  font-size: 1.5rem;
`;

export const TicketCell = styled.td<{
  $ctrd?: boolean;
}>`
  border: 1px solid black;
  padding: 0.5rem;
  font-weight: 500;
  ${(props) => props.$ctrd && `text-align: center;`}
`;

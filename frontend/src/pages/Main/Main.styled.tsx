import styled from "styled-components";

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
  font-size: 1.5rem;
  font-weight: 500;
  background-color: var(--background-secondary);
  border: 1px solid var(--text-primary);
`;

export const TicketCell = styled.td<{
  $ctrd?: boolean;
}>`
  border: 1px solid var(--text-primary);
  padding: 0.5rem;
  font-weight: 500;
  ${(props) => props.$ctrd && `text-align: center;`}
  background-color: white;
`;

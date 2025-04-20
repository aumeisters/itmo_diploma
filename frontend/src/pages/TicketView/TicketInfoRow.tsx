import { ReactNode } from "react";
import { TicketViewRow } from "./TicketView.styled";

type TicketInfoRowProps = {
  title: string;
  children: ReactNode,
}

export const TicketInfoRow = ({
  title,
  children,
}: TicketInfoRowProps) => {

  return (
    <TicketViewRow>
      <span>{title}:&nbsp;</span>
      {children}
    </TicketViewRow>
  )
}

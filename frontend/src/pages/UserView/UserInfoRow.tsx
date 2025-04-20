import { InfoRowTitle, InfoRowValue } from "./UserInfoRow.styled";

type UserInfoRowProps = {
  value: string | number;
  title: string;
}

export const UserInfoRow = ({
  value,
  title,
}: UserInfoRowProps) => {

  return (
    <InfoRowTitle>
      {title}:&nbsp;
      <InfoRowValue>{value}</InfoRowValue>
    </InfoRowTitle>
  )
}
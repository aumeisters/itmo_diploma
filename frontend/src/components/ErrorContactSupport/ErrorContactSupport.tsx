import Link from "@mui/material/Link";
import { ErrorText } from "../ErrorText/ErrorText.styled";

export const ErrorContactSupport = () => (
  <>
    <ErrorText>
      Произошла ошибка, свяжитесь с поддержкой&nbsp;
      <Link href='mailto:team@support.com'>
        team@support.com
      </Link>
    </ErrorText>
  </>
);

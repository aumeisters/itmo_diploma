import  Link  from "@mui/material/Link";
import { Path } from "../../router";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import { clearAuthorizationData } from "../../utils/storageHelper";

export const Logout = () => {
  clearAuthorizationData();
  
  return (
    <Wrapper $mrgt={10} $maxw={30} $shdw $bdrr>
      <h2>Вы успешно вышли из системы</h2>
      <p>Чтобы вновь авторизироваться в систему перейдите по ссылке ниже:</p>
      <Link href={Path.LOGIN} underline="none">логин</Link>
    </Wrapper>
  );
};

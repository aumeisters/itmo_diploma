import { Path } from "../../router";
import { isAdminUser } from "../../utils/storageHelper";
import { NavigationLink, NavigationWrapper } from "./Navigation.styled";

export function Navigation() {
  const isAdmin = isAdminUser();

  return (
    <NavigationWrapper $isAdmin={isAdmin} >
      <div>
        <NavigationLink to={Path.MAIN} end>
          На главную
        </NavigationLink>
      </div>
      <div>
      <NavigationLink to={Path.LOGOUT} end>
        Выход
      </NavigationLink>
      </div>
    </NavigationWrapper>
  );
}
import { Path } from "../../router";
import { NavigationLink, NavigationWrapper } from "./Navigation.styled";

export function Navigation() {
  return (
    <NavigationWrapper>
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
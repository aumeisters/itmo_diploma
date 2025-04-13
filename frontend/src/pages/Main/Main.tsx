import { Roles } from "../../api";
import { getUserRole } from "../../utils/storageHelper"
import { MainAdminView } from "./MainAdminView";
import { MainInvestorView } from "./MainInvestorView";

export const Main = () => {
  const userRole = getUserRole();
  const isAdmin = userRole === Roles.ADMIN;

  return isAdmin ?
    <MainAdminView /> :
    <MainInvestorView />
}
import { isAdminUser } from "../../utils/storageHelper"
import { MainAdminView } from "./MainAdminView";
import { MainInvestorView } from "./MainInvestorView";

export const Main = () => {
  return isAdminUser() ?
    <MainAdminView /> :
    <MainInvestorView />
}
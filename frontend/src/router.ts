import {
  createBrowserRouter,
} from "react-router";
import {
  CreateAccount,
  CreateTicket,
  NotFound,
  Login,
  Logout,
  Main,
  TicketView,
} from "./pages";

export const Path = {
  MAIN: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  CREATE_ACCOUNT: '/create-account',
  TICKET: '/ticket/:id',
  getTicketPage: (id: number) => `/ticket/${id}`,
  CREATE_TICKET:  '/create-ticket',
}

export const router = createBrowserRouter([
  {
    path: Path.MAIN,
    Component: Main,
  },
  {
    path: Path.LOGIN,
    Component: Login,
  }, 
  {
    path: Path.LOGOUT,
    Component: Logout,
  },
  {
    path: Path.CREATE_ACCOUNT,
    Component: CreateAccount,
  },
  {
    path: Path.CREATE_TICKET,
    Component: CreateTicket,
  },
  {
    path: Path.TICKET,
    Component: TicketView,
  },
  {
    path:'*',
    Component: NotFound,
  }
]);

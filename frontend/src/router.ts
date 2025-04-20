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
  UserView,
} from "./pages";

export const Path = {
  MAIN: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  CREATE_ACCOUNT: '/create-account',
  TICKET: '/ticket/:id',
  getTicketPage: (id: number) => `/ticket/${id}`,
  CREATE_TICKET:  '/create-ticket',
  USER: '/user/:id',
  getUserPage: (id: number) => `/user/${id}`,
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
    path: Path.USER,
    Component: UserView,
  },
  {
    path:'*',
    Component: NotFound,
  }
]);

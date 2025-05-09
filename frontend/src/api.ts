import axios from "axios";
import { APP_BASE_URL } from "./config";
import { getUserAuthToken, setAuthorizationData } from "./utils/storageHelper";

type LoginParams = {
  email: string;
  password: string;
}

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type LoginResponse = {
  token: string;
  role: Roles;
}

export const login = async (params: LoginParams): Promise<void> => {
  const { data } = await axios.post<LoginResponse>(`${APP_BASE_URL}/authorize`, params);
  setAuthorizationData(data);
}

type CreateAccountParams = {
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

export const createAccount = async (params: CreateAccountParams): Promise<void> => {
  await axios.post(`${APP_BASE_URL}/users`, params);
}

export enum TicketStatus {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

type Author = {
  id: number;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
}

export type Message = {
  author: Author;
  createdAt: string;
  id: number;
  isDeleted: boolean;
  message: string;
}

export type Ticket = {
  id: number;
  title: string;
  createdAt: string;
  issue: string;
  status: TicketStatus;
  requester: Author;
  messages: Message[];
}

export const fetchTickets = async (): Promise<Ticket[]> => {
  const { data } = await axios.get<{ tickets: Ticket[] }>(`${APP_BASE_URL}/tickets`, {
    headers: {
      Authorization: getUserAuthToken(),
    }
  });

  return data.tickets;
}

export const fetchTicketsbyAdmin = async (): Promise<Ticket[]> => {
  const { data } = await axios.get<{ tickets: Ticket[] }>(`${APP_BASE_URL}/admin/tickets`, {
    headers: {
      Authorization: getUserAuthToken(),
    }
  });

  return data.tickets;
}

type CreateTicketParams = {
  title: string;
  issue: string;
}

export const createTicket = async (params: CreateTicketParams): Promise<void> => {
  await axios.post(`${APP_BASE_URL}/tickets`, params, {
    headers: {
      Authorization: getUserAuthToken(),
    }
  });
}

export const fetchTicket = async (id: number): Promise<Ticket> => {
  const { data } = await axios.get<{ ticket: Ticket }>(`${APP_BASE_URL}/tickets/${id}`, {
    headers: {
      Authorization: getUserAuthToken(),
    }
  });

  return data.ticket;
}

type CreateMessageParams = {
  ticketId: number;
  message: string;
}
  
export const createMessage = async (params: CreateMessageParams): Promise<void> => {
  await axios.post(`${APP_BASE_URL}/messages`, params, {
    headers: {
      Authorization: getUserAuthToken(),
    }
  });
}

type UpdateTicketStatusParams = {
  ticketId: number;
  newStatus: string;
}

export const updateTicketStatus = async ({
  ticketId,
  newStatus,
}: UpdateTicketStatusParams): Promise<void> => {
  await axios.patch(`${APP_BASE_URL}/admin/tickets/${ticketId}`, { newStatus }, {
    headers: {
      Authorization: getUserAuthToken(),
    }
  });
}

export type User = {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  isDeleted: boolean;
  createdAt: string;
  dateOfBirth: string;
  tickets?: Ticket[];
}

export const fetchUser = async (id: number): Promise<User> => {
  const { data } = await axios.get<{ user: User }>(`${APP_BASE_URL}/admin/users/${id}`, {
    headers: {
      Authorization: getUserAuthToken(),
    }
  });

  return data.user;
}
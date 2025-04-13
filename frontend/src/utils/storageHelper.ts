import { LoginResponse } from "../api";

export const clearAuthorizationData = () => {
  window.localStorage.removeItem('authToken');
  window.localStorage.removeItem('userRole');
}

export const setAuthorizationData = ({
  token,
  role,
}: LoginResponse) => {
  window.localStorage.setItem('authToken', token);
  window.localStorage.setItem('userRole', role);
}

export const getUserRole = () => window.localStorage.getItem('userRole');

export const getUserAuthToken = () => window.localStorage.getItem('authToken');



import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { Path } from "../../router";

export const AuthValidator = ({
  children,
}: {
  children: ReactNode,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authToken = window.localStorage.getItem('authToken');

      if (!authToken) {
        return navigate(Path.LOGIN);
      };
    })()
  }, [])

  return (
    <>
      {children}
    </>
  )
};
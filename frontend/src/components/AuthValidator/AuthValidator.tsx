import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { Path } from "../../router";
import { getUserAuthToken } from '../../utils/storageHelper';

export const AuthValidator = ({
  children,
}: {
  children: ReactNode,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authToken = getUserAuthToken();

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
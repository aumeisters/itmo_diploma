import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { Path } from "../../router";
import { isAdminUser } from '../../utils/storageHelper';

export const AdminRoleValidator = ({
  children,
}: {
  children: ReactNode,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isAdmin = isAdminUser();

      if (!isAdmin) {
        return navigate(Path.MAIN);
      };
    })()
  }, [])

  return (
    <>
      {children}
    </>
  )
};
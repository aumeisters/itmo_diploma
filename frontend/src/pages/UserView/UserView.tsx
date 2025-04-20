import { useParams } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";
import { Wrapper } from "../../components/Wrapper/Wrapper.styled";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader.styled";
import { ErrorContactSupport } from "../../components/ErrorContactSupport/ErrorContactSupport";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper.styled";
import { fetchUser, User } from "../../api";
import { AuthValidator } from "../../components/AuthValidator/AuthValidator";
import { AdminRoleValidator } from "../../components/AdminRoleValidator/AdminRoleValidator";
import { parseDate } from "../../utils/prepareDate";
import { UserInfoRow } from "./UserInfoRow";
import { UserTickets } from "./UserTickets";

export const UserView = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  let { id } = useParams();

  const getUser = useCallback(async () => {
    setIsLoading(true);
      
    if (id) {
      try {
        const user = await fetchUser(Number(id));
        setUser(user);
      } catch (error: any) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      };
    }
  }, [id])

  useEffect(() => {
    (async () => await getUser())();
  }, [getUser]);

  if (isLoading || !user) {
    return <Loader />
  }
  
  return (
    <AuthValidator>
      <AdminRoleValidator>
        <Navigation />
        <PageWrapper>
          <Wrapper $maxw={100}>
            <UserInfoRow value={user.id} title='Идентификатор'/>
            <UserInfoRow value={user.firstname} title='Имя'/>
            <UserInfoRow value={user.lastname} title='Фамилия'/>
            <UserInfoRow value={user.email} title='Имейл'/>
            <UserInfoRow value={parseDate(user.dateOfBirth)} title='Дата рождения'/>
            <UserInfoRow value={parseDate(user.createdAt)} title='Дата регистрации'/>
            {user.tickets && Boolean(user.tickets?.length) && (
             <UserTickets tickets={user.tickets} />
            )}
            {isError && <ErrorContactSupport />}
          </Wrapper>
        </PageWrapper>
      </AdminRoleValidator>
    </AuthValidator>
  )
}
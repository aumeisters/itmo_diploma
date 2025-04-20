import styled from "styled-components";
import { NavLink } from "react-router";

export const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;


export const NavigationLink = styled(NavLink)`
  margin: 0 0.5rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`
import styled from "styled-components";

export const MessageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessageWrapper = styled.div`
  margin-top: 1rem;
`;

export const MessageHeader = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
  justify-content: space-between;
`;

export const MessageText = styled.div`
  font-size: 1.2rem;
`;

export const MessageSvgWrapper = styled.div`
  margin-right: 0.3rem; 
`;

export const MessageAuthor = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
`;
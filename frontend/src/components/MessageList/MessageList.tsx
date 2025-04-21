import { Message } from "../../api";
import { parseDatetime } from "../../utils/prepareDate";
import { MessageAdminSvg } from "./MessageAdminSvg";
import {
  MessageAuthor,
  MessageHeader,
  MessageListWrapper,
  MessageText,
  MessageWrapper,
} from "./MessageList.styled";

type MessageListProps = {
  messages?: Message[];
}

export const MessageList = ({
  messages,
}: MessageListProps) => {
  return (
    <MessageListWrapper>
      {messages?.map((message: Message) => (
          <MessageWrapper key={message.id}>
            <MessageHeader>
              <MessageAuthor>
                {message.author.isAdmin ? <MessageAdminSvg /> : ''}
                <p>{message.author.firstname} {message.author.lastname}</p>
              </MessageAuthor>
              <p>{parseDatetime(message.createdAt)}</p>
            </MessageHeader>
            <MessageText>
              <p>{message.message}</p>
            </MessageText>
          </MessageWrapper>
        ))
      }
    </MessageListWrapper>
  )
}

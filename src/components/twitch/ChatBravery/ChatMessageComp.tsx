import { Chatter } from "../../../types/GuessTheSubTypes";
import { ChatMessage } from "@twurple/chat";

interface ChatMessageProps {
  chatter: Chatter;
  message: ChatMessage;
}

// const getRandomColor = () => {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// };

export function ChatMessageComp({ chatter, message }: ChatMessageProps) {
  return (
    <div className="message centerR">
      <img
        className="sub-iconComp"
        src={chatter.subIcon}
        alt="Subscriber Icon"
      />
      <span
        className="chatter-nameComp"
        style={{ color: message.userInfo.color }}
      >
        {chatter.name}:
      </span>
      <span className="message-text">{message.text}</span>
    </div>
  );
}

export default ChatMessage;

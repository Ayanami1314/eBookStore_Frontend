import { useEffect, useState } from "react";
import useWebSocketClient, {
  WebSocketClientProps,
  WebSocketMessage,
} from "../hooks/useWs";
import useNotificationStore from "../stores/useNotificationStore";

const WebSocketAdapter = (props: WebSocketClientProps) => {
  console.log(
    `re-rendering WebSocketAdapter with user_id: ${props.users?.user_id}`
  );
  const { messages } = useWebSocketClient(props);
  const pushNotification = useNotificationStore((s) => s.pushNotification);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (messages.length > offset) {
      messages.slice(offset).forEach((element) => {
        const message: WebSocketMessage = JSON.parse(element);
        pushNotification({ content: message.content, level: "info" });
      });
      console.log("total messages " + messages.length);
      setOffset(messages.length);
    }
  }, [messages, pushNotification]);
  return <></>;
};

export default WebSocketAdapter;

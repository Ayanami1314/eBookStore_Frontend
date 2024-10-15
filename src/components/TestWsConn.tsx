import { useEffect, useState } from "react";
import { SOCK_WS_CONN_URL } from "../common/common";
import useWebSocketClient, { WebSocketClientProps } from "../hooks/useWs";
import { useMe } from "../hooks/useUsers";
import useNotificationStore from "../stores/useNotificationStore";
import WebSocketAdapter from "./WebSocketAdapter";
import { send } from "process";

const WebSocketExample = () => {
  // WebSocket URL
  const { data: me, isError, isLoading } = useMe();

  const props: WebSocketClientProps = {
    topics: ["heartbeats", "public"],
    url: SOCK_WS_CONN_URL,
  };
  // Initialize the WebSocket connection
  const { isConnected, messages, error, sendMessage } =
    useWebSocketClient(props);
  const handleSendMessage = (data: string) => {
    sendMessage("echo", { content: data, senderId: me ? me.id : 0 });
  };
  const handleSendMessage2 = (data: string) => {
    sendMessage("hello", { content: data, receiverId: 2, senderId: me ? me.id : 0 } );
  };
  const pushNotification = useNotificationStore(s => s.pushNotification);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (messages.length > offset) {
          messages.slice(offset).forEach(element => {
      pushNotification({ content: element, level: "info" });
          });
      console.log("total messages " + messages.length)
      setOffset(messages.length);
    }
  }, [messages, pushNotification]);
  const [user_props, setUserProps] = useState({ 
    topics: [], 
    url: SOCK_WS_CONN_URL, 
    users: { user_id: me?.id || 0, topics: ["queue/chats"] } 
});

  useEffect(() => {
    setUserProps({
        ...user_props,
        users: {
            ...user_props.users,
            user_id: me?.id || 0,
        }
    });
  }, [me]);
  return (
    !error &&
    isConnected && (
      <div>
        <button onClick={() => handleSendMessage("hello world!")}>
          Send Message
        </button>
        <button onClick={() => handleSendMessage2("Test!")}>
          Send Hello
        </button>
        {me && <WebSocketAdapter {...user_props} />}
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default WebSocketExample;

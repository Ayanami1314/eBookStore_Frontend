import {
  useState,
  useEffect,
  useRef,
  useCallback,
  SetStateAction,
} from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { CompatClient, Stomp } from "@stomp/stompjs";
type PrivateTopicParam = {
  topics: string[];
  user_id: number;
};
type WebSocketClientProps = {
  topics: string[];
  url: string;
  users?: PrivateTopicParam;
};
type WebSocketMessage = {
  senderId: number;
  receiverId?: number;
  content: any;
  date?: string;
};

const useWebSocketClient = ({ topics, url, users }: WebSocketClientProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnect] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stompClientRef = useRef<CompatClient | null>(null);
  const connect = useCallback(() => {
    stompClientRef.current = Stomp.over(new SockJS(url));
    stompClientRef.current.connect(
      {},
      () => {
        setIsConnect(true);
        setError(null);
        topics.forEach((topic) =>
          stompClientRef.current?.subscribe(`/topic/${topic}`, (message) => {
            console.log(`Subscribe /topic/${topic}`);
            setMessages((prev) => [...prev, message.body]);
          })
        );
        if (users) {
          users.topics.forEach((topic) =>
            stompClientRef.current?.subscribe(
              `/user/${users.user_id}/${topic}`,
              (message) => {
                console.log(`Subscribe /user/${users.user_id}/${topic}`);
                setMessages((prev) => [...prev, message.body]);
              }
            )
          );
        }
      },
      (error: SetStateAction<string | null>) => {
        setIsConnect(false);
        setError(error);
      }
    );
  }, [topics, url, users]);
  const disconnect = useCallback(() => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.disconnect(() => {
        setIsConnect(false);
      });
    }
  }, []);
  const sendMessage = useCallback(
    (topic: string, message: WebSocketMessage) => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.send(
          `/app/${topic}`,
          {},
          JSON.stringify(message)
        );
      }
    },
    []
  );
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);
  return { isConnected, messages, error, sendMessage };
};

export default useWebSocketClient;
export type { WebSocketClientProps, PrivateTopicParam, WebSocketMessage };

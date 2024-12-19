import { useEffect, useState } from "react";
import { useMe } from "../hooks/useUsers";
import { SOCK_WS_CONN_URL } from "../common/common";
import useNotificationStore from "../stores/useNotificationStore";
import WebSocketAdapter from "./WebSocketAdapter";

const GlobalWebSocketReponseProvider = () => {
  const { data: me, isLoading, isError } = useMe();
  // {customerId}/queue/notifications
  const user_topics = ["queue/notifications"];
  const [props, setProps] = useState({
    topics: [],
    url: SOCK_WS_CONN_URL,
    users: { user_id: me?.id || 0, topics: user_topics },
  });

  // ATTENTION: 新建一个props对象避免shallow copy 传给下面不adapter不重新渲染
  useEffect(() => {
    if (me?.id) {
      console.log("update props");
      const new_user = { user_id: me?.id || 0, topics: user_topics };
      const new_props = { url: SOCK_WS_CONN_URL, topics: [], users: new_user };
      setProps(new_props);
    }
  }, [me?.id]);
  const pushNotification = useNotificationStore((s) => s.pushNotification);
  useEffect(() => {
    if (me) {
      pushNotification({
        content: `Connected to the server on user ${me.id}`,
        level: "info",
      });
    }
  }, [me, pushNotification]);

  return <WebSocketAdapter {...props} />;
};

export default GlobalWebSocketReponseProvider;

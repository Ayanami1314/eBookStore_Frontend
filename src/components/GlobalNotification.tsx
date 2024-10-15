import React, { useEffect } from "react";
import { message } from "antd";
import useNotificationStore from "../stores/useNotificationStore";
const GlobalNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const message_queue = useNotificationStore((s) => s.message_queue);
  const pop = useNotificationStore((s) => s.popNotification);
  useEffect(() => {
    if (message_queue.length > 0) {
      const element = message_queue[0];
      const exist_time = element.time ? element.time : 1000;
      setTimeout(() => {
        if (element.level === "error") {
          messageApi.error(element.content);
        }
        if (element.level === "info") {
          messageApi.info(element.content);
        }
        if (element.level === "warning") {
          messageApi.warning(element.content);
        }
        pop();
      }, exist_time);
    }
  }, [message_queue, messageApi, pop]);
  return <>{contextHolder}</>;
};

export default GlobalNotification;

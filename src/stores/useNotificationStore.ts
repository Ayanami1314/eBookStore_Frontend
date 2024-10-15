import { create } from "zustand";
type Notifaction = {
    content: string;
    level: "info" | "warning" | "error";
    time?: number;
}
interface NotificationStore {
    message_queue: Notifaction[];
    pushNotification: (notifaction: Notifaction) => void;
    popNotification: () => void;
}
const useNotificationStore = create<NotificationStore>((set) => ({
  message_queue: [],
  pushNotification: (notifaction: Notifaction) =>
    set((state) => ({ message_queue: [...state.message_queue, notifaction] })),
  popNotification: () =>
        set((state) => ({ message_queue: state.message_queue.slice(1) })),
}));
export default useNotificationStore;
export type { Notifaction, NotificationStore };

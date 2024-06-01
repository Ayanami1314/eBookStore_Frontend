import { create } from "zustand";
import { OrderQuery } from "../hooks/useOrder";
interface OrderQueryStore {
  query: OrderQuery;
  setQuery: (query: OrderQuery) => void;
  setSearchText: (text: string) => void;
}
const useBookQuery = create<OrderQueryStore>((set) => ({
  query: { keyword: "", start: null, end: null },
  setQuery: (query: OrderQuery) => set({ query }),
  setSearchText: (text: string) =>
    set((state) => ({ query: { ...state.query, keyword: text } })),
}));
export default useBookQuery;

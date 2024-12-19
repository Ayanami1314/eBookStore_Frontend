import { create } from "zustand";
import { BookQueryType } from "../hooks/useBook";
interface BookQueryStore {
  searchText: string;
  queryType: BookQueryType;
  setSearchText: (text: string) => void;
  setQueryType: (type: BookQueryType) => void;
}
const useBookQuery = create<BookQueryStore>((set) => ({
  searchText: "",
  queryType: "title",
  setSearchText: (text: string) => set({ searchText: text }),
  setQueryType: (type: BookQueryType) => set({ queryType: type }),
}));
export default useBookQuery;

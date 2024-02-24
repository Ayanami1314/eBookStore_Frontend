import { create } from "zustand";
interface BookQueryStore {
  searchText: string;
  setSearchText: (text: string) => void;
}
const useBookQuery = create<BookQueryStore>((set) => ({
  searchText: "",
  setSearchText: (text: string) => set({ searchText: text }),
}));
export default useBookQuery;

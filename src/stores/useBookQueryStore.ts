import { create } from "zustand";

interface BookFilterQuery {
  searchText?: string;
}
interface QueryStore {
  query: BookFilterQuery;
  setSearchText: (query: string) => void;
  clearSearchText: () => void;
}

const useBookQueryStore = create<QueryStore>((set) => ({
  query: {
    searchText: "",
  },
  setSearchText: (searchText: string) =>
    set((state) => ({
      ...state,
      query: { ...state.query, searchText: searchText },
    })),
  clearSearchText: () =>
    set((state) => ({ ...state, query: { ...state.query, searchText: "" } })),
}));
export default useBookQueryStore;

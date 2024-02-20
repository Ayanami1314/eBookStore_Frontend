import { create } from "zustand";

interface BillFilterQuery {
  searchText?: string;
  time_begin?: Date;
  time_end?: Date;
}
interface QueryStore {
  query: BillFilterQuery;
  setSearchText: (searchText: string) => void;
  setSearchTime: (begin?: Date, end?: Date) => void;
  clearQuery: () => void;
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
  setSearchTime: (begin?: Date, end?: Date) =>
    set((state) => ({
      ...state,
      query: { ...state.query, time_begin: begin, time_end: end },
    })),
  clearQuery: () => set((state) => ({ ...state, query: {} })),
}));
export default useBookQueryStore;

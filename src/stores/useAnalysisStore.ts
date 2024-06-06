import { Dayjs } from "dayjs";
import { create } from "zustand";
interface AnalysisStore {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  keyword: string;
  setStart: (date: Dayjs | null) => void;
  setEnd: (date: Dayjs | null) => void;
  setKeyword: (keyword: string) => void;
}
const useAnalysisStore = create<AnalysisStore>((set) => ({
  keyword: "",
  startDate: null,
  endDate: null,
  setStart: (date: Dayjs | null) =>
    set((state) => ({ ...state, startDate: date })),
  setEnd: (date: Dayjs | null) => set((state) => ({ ...state, endDate: date })),
  setKeyword: (keyword: string) =>
    set((state) => ({ ...state, keyword: keyword })),
}));
export default useAnalysisStore;

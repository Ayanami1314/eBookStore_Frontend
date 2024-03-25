import { Dayjs } from "dayjs";
import { create } from "zustand";
interface AnalysisStore {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStart: (date: Dayjs | null) => void;
  setEnd: (date: Dayjs | null) => void;
}
const useAnalysisStore = create<AnalysisStore>((set) => ({
  startDate: null,
  endDate: null,
  setStart: (date: Dayjs | null) => set({ startDate: date }),
  setEnd: (date: Dayjs | null) => set({ endDate: date }),
}));
export default useAnalysisStore;

import { create } from "zustand";

// 在购物车的Table和提交Button之中传递数据
interface selectedItems {
  hasOrder: boolean;
  itemIds: number[];
  setIds: (ids: number[]) => void;
  setHasOrder: (has: boolean) => void;
}
const useCartStore = create<selectedItems>((set) => ({
  hasOrder: false,
  itemIds: [],
  setIds: (ids: number[]) => set({ itemIds: ids }),
  setHasOrder: (has: boolean) => set({ hasOrder: has }),
}));

export default useCartStore;

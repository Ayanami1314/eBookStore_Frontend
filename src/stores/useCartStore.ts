import { create } from "zustand";

// 在购物车的Table和提交Button之中传递数据
interface BuyItem {
  id: number;
  number: number;
}
interface selectedItems {
  hasOrder: boolean;
  BuyItems: BuyItem[];
  setItems: (items: BuyItem[]) => void;
  setHasOrder: (has: boolean) => void;
}
const useCartStore = create<selectedItems>((set) => ({
  hasOrder: false,
  BuyItems: [],
  setItems: (items: BuyItem[]) => set({ BuyItems: items }),
  setHasOrder: (has: boolean) => set({ hasOrder: has }),
}));

export default useCartStore;

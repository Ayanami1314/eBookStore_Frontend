import { create } from "zustand";

// 在购物车的Table和提交Button之中传递数据
interface BuyItem {
  id: number;
  number: number;
  buy: boolean;
}
interface selectedItems {
  BuyItems: BuyItem[];
  setItems: (items: BuyItem[]) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}
const useCartStore = create<selectedItems>((set) => ({
  BuyItems: [],
  setItems: (items: BuyItem[]) => set({ BuyItems: items }),
  searchText: "",
  setSearchText: (text: string) => set({ searchText: text }),
}));

export default useCartStore;
export type { BuyItem };

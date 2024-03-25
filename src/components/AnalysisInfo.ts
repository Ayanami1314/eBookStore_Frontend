import dayjs, { Dayjs } from "dayjs";
import { UserOrder } from "../hooks/useOrder";
interface BookInfo {
  id: number;
  title: string;
  price: number;
  number: number;
}
interface AnalysisInfo {
  AllBookInfo: BookInfo[];
  totalCost: number;
  totalNumber: number;
}
const getAnalysisInfo = (
  data: UserOrder[] | undefined,
  Timefilter?: (date: Dayjs) => boolean
): AnalysisInfo => {
  const AllBookInfo: BookInfo[] = [];
  data?.map((order) => {
    order.items.map((item) => {
      if (Timefilter && !Timefilter(dayjs(order.createdAt))) {
        return;
      }
      const newBookInfo: BookInfo = {
        id: item.book.id,
        title: item.book.title,
        price: item.book.price,
        number: item.number,
      };

      if (
        AllBookInfo.find((book) => book.id === newBookInfo.id) === undefined
      ) {
        AllBookInfo.push(newBookInfo);
      } else {
        const index = AllBookInfo.findIndex(
          (book) => book.id === newBookInfo.id
        );

        AllBookInfo[index].number += newBookInfo.number;
      }
    });
  });
  console.log(AllBookInfo);
  const totalCost = AllBookInfo.reduce(
    (total, item) => total + item.price * item.number,
    0
  );
  const totalNumber = AllBookInfo.reduce(
    (total, item) => total + item.number,
    0
  );
  return {
    AllBookInfo,
    totalCost,
    totalNumber,
  };
};
export default getAnalysisInfo;
export type { AnalysisInfo, BookInfo };

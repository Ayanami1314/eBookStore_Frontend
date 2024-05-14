import { Dayjs } from "dayjs";

export default function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，所以需要+1
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export function dayToString(dayjs: Dayjs | null) {
  return dayjs ? dayjs.format("YYYY-MM-DD hh:mm:ss") : null;
}

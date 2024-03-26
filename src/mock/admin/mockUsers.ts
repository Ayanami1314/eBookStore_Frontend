import { UserToAdmin } from "../../hooks/useUsers";
const mockUsers: UserToAdmin[] = [
  {
    totalcost: 2,
    id: 20,
    nickname: "蒋洋",
    balance: 0,
    ban: false,
  },
  {
    totalcost: 87,
    id: 49,
    nickname: "蔡超",
    balance: 0,
    ban: false,
  },
  {
    totalcost: 66,
    id: 3,
    nickname: "李磊",
    balance: 0,
    ban: true,
  },
  { totalcost: 1, id: 1, nickname: "张三", balance: 0 },
];
export default mockUsers;

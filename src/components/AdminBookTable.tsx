import { Button, Flex, Table, TableProps } from "antd";
import { Book } from "../hooks/useBook";
interface BookTableProps {
  books: Book[];
}
type BookWithKey = Book & { key: number };
// id: number;
// title: string;
// description: string;
// author: string;
// price: number;
// cover: string; // 图像资源的url
// sales: number;
// isbn?: string;
const AdminBookTable = ({ books }: BookTableProps) => {
  const LongText = (text: string | undefined) =>
    text && text.length > 10 ? text.substring(0, 10) + "..." : text;
  const BookWithKey = books.map((b, index) => ({ ...b, key: index }));
  // TODO: replace them with the real backend
  const handleChange = (id: number) => {
    console.log("Try to modify Book " + id);
  };
  const handleDel = (id: number) => {
    console.log("Try to delete Book " + id);
  };
  const columns: TableProps<BookWithKey>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "简介",
      dataIndex: "description",
      key: "description",
      render: (value, record) => {
        console.log(record);
        return <p>{LongText(value)}</p>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "售价",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "销量",
      dataIndex: "sale",
      key: "sale",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
      render: (value, record) => {
        console.log(record);
        return value ? value : <p>{"暂无ISBN序列号"}</p>;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Flex gap="small">
          <Button type="primary" onClick={() => handleChange(record.id)}>
            修改书籍信息
          </Button>
          <Button type="primary" danger onClick={() => handleDel(record.id)}>
            删除书籍
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={BookWithKey}></Table>
    </>
  );
};

export default AdminBookTable;

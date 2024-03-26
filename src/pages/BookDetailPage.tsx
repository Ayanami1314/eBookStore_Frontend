import { useSingleBook } from "../hooks/useBook";
import { useParams } from "react-router-dom";
import { useAddCartItem } from "../hooks/useCart";
import { message, Skeleton } from "antd";
import BookDetailCard from "../components/BookDetailCard";
const BookDetailPage = () => {
  const { id } = useParams();
  const { addFn, responseData, isError: addBookError } = useAddCartItem();
  const addHandler = (id: number) => {
    addFn(id);
    if (addBookError) {
      messageApi.open({ type: "error", content: "操作失败！" });
    } else {
      messageApi.open({ type: "success", content: "操作成功！" });
    }
  };
  console.log("加入购物车请求返回：", responseData);
  const [messageApi, contextHolder] = message.useMessage();
  if (!id) {
    throw new Error("路由缺少id参数");
  }
  const { data: book, isLoading, isError } = useSingleBook(id);
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }
  if (!book) {
    return <div>{"书籍不存在"}</div>;
  }
  if (isError) {
    throw new Error("请求错误");
  }

  return (
    <>
      {contextHolder}
      <BookDetailCard book={book} addToCart={addHandler}></BookDetailCard>
    </>
  );
};

export default BookDetailPage;

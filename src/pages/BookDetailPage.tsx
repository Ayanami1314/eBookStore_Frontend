import { useSingleBook } from "../hooks/useBook";
import { useParams } from "react-router-dom";
import { useAddCartItem, useCart } from "../hooks/useCart";
import { message, Skeleton } from "antd";
import BookDetailCard from "../components/BookDetailCard";
import { useEffect } from "react";
const BookDetailPage = () => {
  const { id } = useParams();
  const { addFn, responseData, isError: addBookError } = useAddCartItem();
  const { data } = useCart();
  const addHandler = (id: number) => {
    if (!data) return;
    for (const item of data) {
      if (item.book.id === id) {
        message.open({ type: "error", content: "购物车已有此商品！" });
        return;
      }
    }
    addFn(id);
  };

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (addBookError) {
      messageApi.open({ type: "error", content: "操作失败！" });
    } else if (responseData && responseData.ok) {
      messageApi.open({ type: "success", content: "操作成功！" });
    }
  }, [addBookError, messageApi, responseData]);
  if (!id) {
    throw new Error("路由缺少id参数");
  }
  const { data: book, isLoading, isError } = useSingleBook(Number(id));
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

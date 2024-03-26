import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import HomeLayout from "../pages/HomeLayout";
import UserDetailPage from "../pages/UserDetailPage";
import ErrorPage from "../pages/ErrorPage";
import CreateNewUserForm from "../components/CreateNewUserForm";
import AdminPrivateRoute from "./AdminPrivateRoute";
import UserPrivateRoute from "./UserPrivateRoute";
import CartPage from "../pages/CartPage";
import BookDetailPage from "../pages/BookDetailPage";
import OrderPage from "../pages/OrderPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AnalysisPage from "../pages/AnalysisPage";
import UserListPage from "../pages/UserListPage";
import AdminUserAnalysisPage from "../pages/Admin/AdminUserAnalysisPage";
import AdminBookAnalysisPage from "../pages/Admin/AdminBookAnalysisPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserPrivateRoute />,
    children: [
      {
        path: "home",
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Homepage /> },
          { path: "currentuser", element: <UserDetailPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "book/:id", element: <BookDetailPage /> },
          { path: "order", element: <OrderPage /> },
          { path: "analysis", element: <AnalysisPage /> },
          {
            path: "admin",
            element: <AdminPrivateRoute />,
            children: [
              // NOTE：需要管理员权限才可以访问的页面
              { path: "user", element: <UserListPage /> },
              // NOTE: 订单页和书籍页在用户和管理员都可以访问
              {
                path: "analysis",
                children: [
                  { index: true, element: <AdminUserAnalysisPage /> },
                  { path: "book", element: <AdminBookAnalysisPage /> },
                  { path: "user", element: <AdminUserAnalysisPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    children: [
      { index: true, element: <LoginPage /> },
      { path: "create", element: <CreateNewUserForm /> },
      { path: "password", element: <ResetPasswordPage /> },
    ],
  },
]);
export default router;

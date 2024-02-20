import { createBrowserRouter } from "react-router-dom";
import Homepage from "./HomePage";
import LoginPage from "./LoginPage";
import HomeLayout from "../components/HomeLayout";
import UserDetailPage from "./UserDetailPage";
import ErrorPage from "./ErrorPage";
import CreateNewUserForm from "../components/CreateNewUserForm";
import PrivateRoute from "./PrivateRoute";
import AdminHomePage from "./admin/AdminHomePage";
/*
/ (home-page)
NavBar
(NavBar根据user和admin信息改变)
(admin多一个进入后台)
booklist
- /login 右上角登录或者
- /user
  - /cart
  - /bill
  - /analysis
- /admin
  - /manageSystem
    - /users --用户管理
    - /items --书籍管理
    - /bills --订单管理
    - /adminAnalysis --统计分析
      - /userComsuption
      - /bookComsuption
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "login",
        children: [
          { index: true, element: <LoginPage /> },
          { path: "create", element: <CreateNewUserForm /> },
        ],
      },
      { path: "user/:id", element: <UserDetailPage /> },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute />,
    children: [
      // 全部正常用户可以访问的界面
      {
        path: "home",
        element: <HomeLayout />,
        children: [
          { index: true, element: <AdminHomePage></AdminHomePage> },
          {
            path: "login",
            children: [
              { index: true, element: <LoginPage /> },
              { path: "create", element: <CreateNewUserForm /> },
            ],
          },
          { path: "user/:id", element: <UserDetailPage /> },
        ],
      },
    ],
  },
]);
export default router;

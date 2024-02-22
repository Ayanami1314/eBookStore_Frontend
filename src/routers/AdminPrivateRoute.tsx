import { Navigate, Outlet } from "react-router-dom";
import { Alert, Space } from "antd";
import useAuthStore from "../auth/useAuthStore";

const AdminPrivateRoute = () => {
  const { try_invalid_op, isAdmin } = useAuthStore((s) => s.authinfo);
  const { setInvalidOp } = useAuthStore();

  if (!isAdmin) {
    setInvalidOp(true);
    return (
      <>
        {try_invalid_op && (
          // alert message
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert message="Warning text" banner />
            <Alert
              message="Very long warning text warning text text text text text text text"
              banner
              closable
            />
            <Alert
              showIcon={false}
              message="Warning text without icon"
              banner
            />
            <Alert type="error" message="Error text" banner />
          </Space>
        )}
        <Navigate to="/login"></Navigate>
      </>
    );
  }
  return <Outlet />;
};

export default AdminPrivateRoute;

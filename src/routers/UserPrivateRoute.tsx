import useAuthStore from "../auth/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
  const { isUser } = useAuthStore((s) => s.authinfo);
  if (!isUser) {
    console.log("Please log in first!")
    return <Navigate to="/login"></Navigate>;
  }
  return <Outlet />;
};

export default UserPrivateRoute;

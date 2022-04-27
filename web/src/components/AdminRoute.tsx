import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const role = useTypedSelector((state) => state.authReducer.role);
  console.log(role);

  return role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;

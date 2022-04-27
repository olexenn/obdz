import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useTypedSelector((state) => state.authReducer.isAuth);

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

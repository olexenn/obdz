import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const isAuth = useTypedSelector((state) => state.authReducer.isAuth);

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import $http from "../../api/axios";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const AuthButtons = () => {
  const navigate = useNavigate();

  const role = useTypedSelector((state) => state.authReducer.role);
  const { setIsAuth, setToken, setRole } = useActions();

  const handleLogout = async () => {
    setIsAuth(false);
    setToken("");
    setRole("");
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    await $http.delete("/signin");
    return navigate("/login", { replace: true });
  };

  return (
    <>
      {role.length > 0 ? (
        <Button
          mt={4}
          colorScheme="purple"
          variant="outline"
          onClick={handleLogout}
        >
          Вийти
        </Button>
      ) : (
        <Button
          mt={4}
          colorScheme="green"
          variant="outline"
          onClick={() => navigate("/login", { replace: true })}
        >
          Увійти
        </Button>
      )}
    </>
  );
};

export default AuthButtons;

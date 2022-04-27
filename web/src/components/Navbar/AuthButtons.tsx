import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const AuthButtons = () => {
  const navigate = useNavigate();

  const role = useTypedSelector((state) => state.authReducer.role);
  const { setIsAuth, setToken, setRole } = useActions();

  const handleLogout = () => {
    setIsAuth(false);
    setToken("");
    setRole("");
    localStorage.removeItem("auth");
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

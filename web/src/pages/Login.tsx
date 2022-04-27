import { Box, Button, CircularProgress, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../api/UserApi";
import ErrorMessage from "../components/Helpers/ErrorMessage";
import FormInput from "../components/Helpers/FormInput";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Login: React.FC = () => {
  const { setError, setIsLoading, setIsAuth, setToken, setRole } = useActions();
  const navigate = useNavigate();

  const isLoading = useTypedSelector((state) => state.authReducer.isLoading);
  const error = useTypedSelector((state) => state.authReducer.error);
  const role = useTypedSelector((state) => state.authReducer.role);

  const [state, setState] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await UserApi.login(state.username, state.password);
      setIsAuth(true);
      setToken(data.tokens.accessToken);
      setRole(data.role);
      setIsLoading(false);
      localStorage.setItem("auth", data.tokens.accessToken);
    } catch (e) {
      setError("Неправильний логін чи пароль");
      setIsLoading(false);
      setState({ username: "", password: "" });
      return;
    }

    setState({ username: "", password: "" });
    if (error) setError("");
    role === "user"
      ? navigate("/", { replace: true })
      : navigate("/users", { replace: true });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="dark-lg"
      >
        <Box textAlign="center">
          <Heading>Вхід до системи</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormInput
              title="Імʼя користувача"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
            <FormInput
              title="Пароль"
              name="password"
              value={state.password}
              onChange={handleChange}
              isPassword
              mt={6}
            />
            <Button
              type="submit"
              mt={4}
              colorScheme="green"
              variant="outline"
              width="full"
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="green" />
              ) : (
                "Увійти"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;

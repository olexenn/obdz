import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../api/UserApi";
import ErrorMessage from "../components/ErrorMessage";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Login: React.FC = () => {
  const { setError, setIsLoading, setIsAuth, setToken, setRole } = useActions();
  const navigate = useNavigate();

  const isLoading = useTypedSelector((state) => state.authReducer.isLoading);
  const error = useTypedSelector((state) => state.authReducer.error);
  const role = useTypedSelector((state) => state.authReducer.role);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await UserApi.login(username, password);
      setIsAuth(true);
      setToken(data.tokens.accessToken);
      setRole(data.role);
      setIsLoading(false);
      localStorage.setItem("auth", data.tokens.accessToken);
    } catch (e) {
      setError("Неправильний логін чи пароль");
      setIsLoading(false);
      setUsername("");
      setPassword("");
      setShowPassword(false);
      return;
    }

    setUsername("");
    setPassword("");
    setShowPassword(false);
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
            <FormControl isRequired>
              <FormLabel htmlFor="text">Імʼя Користувача</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Пароль</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  size="lg"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    aria-label="toggle password view"
                    size="sm"
                    mt={2}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handlePasswordVisibility}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
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

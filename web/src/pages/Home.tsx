import {
  Center,
  Container,
  Heading,
  VStack,
  Text,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi, { IUser } from "../api/UserApi";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuth, setToken } = useActions();

  // TODO: redo user state
  const shit = {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  };

  const token = useTypedSelector((state) => state.authReducer.token);
  const [user, setUser] = useState<IUser>(shit);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const call = async () => {
      const { data } = await UserApi.getInfo(token);
      setUser(data);
    };

    call();
  }, [update]);

  const handleLogout = () => {
    setIsAuth(false);
    setToken("");
    localStorage.removeItem("auth");
    return navigate("/login");
  };

  return (
    <Container mt={4}>
      <Box
        p={8}
        maxWidth="500px"
        borderRadius={8}
        borderWidth={1}
        boxShadow="dark-lg"
      >
        <Image
          src={user.profilePicture}
          alt={user.username}
          boxSize="200px"
          borderRadius="full"
          mx="auto"
        />
        <Center>
          <VStack>
            <Heading>
              {user.firstName} {user.lastName}
            </Heading>
            <Text>Слідчий</Text>
          </VStack>
        </Center>
        <Button
          mt={4}
          colorScheme="purple"
          variant="outline"
          width="full"
          onClick={handleLogout}
        >
          Вийти
        </Button>
      </Box>
    </Container>
  );
};

export default Home;

import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserApi from "../api/UserApi";
import AddUserForm from "../components/Users/AddUserForm";
import TableItem from "../components/Users/TableItem";
import UserModal from "../components/Users/UserModal";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Users: React.FC = () => {
  const token = useTypedSelector((state) => state.authReducer.token);
  const users = useTypedSelector((state) => state.UserReducer.users);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const { setUsers } = useActions();

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const call = async () => {
      const { data } = await UserApi.getAllUsers(token);
      setUsers(data);
    };

    call();
  }, [update]);

  return (
    <>
      <Flex mb={2}>
        <Heading as="h5" size="md">
          Усі Користувачі
        </Heading>
        <Spacer />
        <Button colorScheme="teal" onClick={onOpen}>
          Додати Користувача
        </Button>
      </Flex>
      <UserModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        header="Реєстрація нового користувача"
      >
        <AddUserForm onClose={onClose} />
      </UserModal>
      <Box borderWidth={1} borderRadius={8} boxShadow="lg">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Аватарка</Th>
                <Th>Юзернейм</Th>
                <Th>Імʼя</Th>
                <Th>Прізвище</Th>
                <Th>Дії</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => {
                return <TableItem key={user.id} user={user} />;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Users;

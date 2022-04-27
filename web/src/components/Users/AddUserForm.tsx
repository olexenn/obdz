import {
  Box,
  Button,
  CircularProgress,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserApi from "../../api/UserApi";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ErrorMessage from "../Helpers/ErrorMessage";
import FormInput from "../Helpers/FormInput";

type Props = {
  onClose: () => void;
};

const AddUserForm = (props: Props) => {
  const toast = useToast();
  const error = useTypedSelector((state) => state.authReducer.error);
  const isLoading = useTypedSelector((state) => state.authReducer.isLoading);
  const token = useTypedSelector((state) => state.authReducer.token);
  const { setError, setIsLoading, addUser } = useActions();

  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    if (error) setError("");
    props.onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      setError("Паролі мають бути однаковими");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await UserApi.register(
        state.username,
        state.password,
        state.firstName,
        state.lastName,
        token
      );
      addUser(data);
      setIsLoading(false);
      props.onClose();
      toast({
        title: "Успіх",
        description: "Користувач був успішно створений",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      setError("Користувач з таким юзернеймом вже існує");
      setIsLoading(false);
      return;
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        <FormInput
          title="Юзернейм"
          name="username"
          value={state.username}
          onChange={handleInput}
        />
        <FormInput
          isPassword
          title="Пароль"
          name="password"
          value={state.password}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          isPassword
          title="Повторіть Пароль"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          title="Імʼя"
          name="firstName"
          value={state.firstName}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          title="Прізвище"
          name="lastName"
          value={state.lastName}
          onChange={handleInput}
          mt={4}
        />
        <ModalFooter>
          <Button type="submit" mr={3} colorScheme="teal">
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              "Додати"
            )}
          </Button>
          <Button onClick={handleClose} colorScheme="red">
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="red" />
            ) : (
              "Відмінити"
            )}
          </Button>
        </ModalFooter>
      </form>
    </Box>
  );
};

export default AddUserForm;

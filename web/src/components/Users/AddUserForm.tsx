import { Box, ModalFooter, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import UserApi from "../../api/UserApi";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ErrorMessage from "../Helpers/ErrorMessage";
import FormInput from "../Helpers/FormInput";
import MyButton from "../Helpers/MyButton";

type Props = {
  onClose: () => void;
};

const AddUserForm = (props: Props) => {
  const toast = useToast();
  const { error } = useTypedSelector((state) => state.authReducer);
  const { setError, setIsLoading, addUser } = useActions();

  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
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
      console.log(state);
      const { data } = await UserApi.register(
        state.username,
        state.password,
        state.first_name,
        state.last_name
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
          name="first_name"
          value={state.first_name}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          title="Прізвище"
          name="last_name"
          value={state.last_name}
          onChange={handleInput}
          mt={4}
        />
        <ModalFooter>
          <MyButton title="Додати" mr={3} color="teal" type="submit" />
          <MyButton title="Відмінити" color="red" onClick={handleClose} />
        </ModalFooter>
      </form>
    </Box>
  );
};

export default AddUserForm;

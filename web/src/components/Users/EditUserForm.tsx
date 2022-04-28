import { Box, ModalFooter, useToast } from "@chakra-ui/react";
import { useState } from "react";
import UserApi, { IUser } from "../../api/UserApi";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ErrorMessage from "../Helpers/ErrorMessage";
import FormInput from "../Helpers/FormInput";
import MyButton from "../Helpers/MyButton";

type Props = {
  user: IUser;
  onClose: () => void;
};

const EditUserForm = (props: Props) => {
  const { updateUser, setError, setIsLoading } = useActions();
  const { error, token } = useTypedSelector((state) => state.authReducer);
  const [state, setState] = useState<IUser>(props.user);

  const toast = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await UserApi.updateUser(
        state.id,
        state.username,
        state.firstName,
        state.lastName,
        token
      );
      updateUser(state);
      setIsLoading(false);
      if (error) setError("");
      props.onClose();
      toast({
        title: "Успіх",
        description: `Інформація щодо користувача ${state.username} була оновлена`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (e) {
      setError("Користувач з таким юзернеймом вже існує");
      setIsLoading(false);
      return;
    }
  };

  return (
    <Box>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <FormInput
          title="Юзернейм"
          name="username"
          value={state.username}
          onChange={handleInput}
        />
        <FormInput
          title="Імʼя"
          name="firstName"
          value={state.firstName}
          onChange={handleInput}
        />
        <FormInput
          title="Прізвище"
          name="lastName"
          value={state.lastName}
          onChange={handleInput}
        />
        <ModalFooter>
          <MyButton title="Оновити" color="teal" type="submit" mr={3} />
          <MyButton title="Відмінити" color="red" onClick={props.onClose} />
        </ModalFooter>
      </form>
    </Box>
  );
};

export default EditUserForm;

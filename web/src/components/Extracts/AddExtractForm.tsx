import { Box, ModalFooter, useToast } from "@chakra-ui/react";
import { useState } from "react";
import ExtractApi, { IAddExtract } from "../../api/ExtractApi";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ErrorMessage from "../Helpers/ErrorMessage";
import FormInput from "../Helpers/FormInput";
import FormSelect from "../Helpers/FormSelect";
import FormTextArea from "../Helpers/FormTextAreat";
import MyButton from "../Helpers/MyButton";

type Props = {
  onClose: () => void;
};

const AddExtractForm = (props: Props) => {
  const { users } = useTypedSelector((state) => state.UserReducer);
  const { error, token } = useTypedSelector(state => state.authReducer)
  const { addExtract, setError, setIsLoading } = useActions();
  const toast = useToast();

  const [state, setState] = useState<IAddExtract>({
    number: "",
    qualification: "",
    applicantFirstName: "",
    applicantLastName: "",
    description: "",
    authority: "",
    username: "",
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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

    try {
      setIsLoading(true);
      const { data } = await ExtractApi.addExtract(state, token);
      addExtract(data);
      setIsLoading(false);
      props.onClose();
      toast({
        title: "Успіх",
        description: "Справа Була Успішно Створена",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      setError("Справа з таким номером вже існує");
      setIsLoading(false);
      return;
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        <FormInput
          title="Номер Впровадження"
          name="number"
          value={state.number}
          onChange={handleInput}
        />
        <FormInput
          title="Правова Кваліфікація"
          name="qualification"
          value={state.qualification}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          title="Імʼя потерпілого"
          name="applicantFirstName"
          value={state.applicantFirstName}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          title="Прізвище Потерпілого"
          name="applicantLastName"
          value={state.applicantLastName}
          onChange={handleInput}
          mt={4}
        />
        <FormTextArea
          title="Стислий виклад обставин"
          name="description"
          value={state.description}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          title="Орган Досудових Розслідувань"
          name="authority"
          value={state.authority}
          onChange={handleInput}
          mt={4}
        />
        <FormSelect
          title="Слідчий"
          name="username"
          value={state.username}
          onChange={handleInput}
          mt={4}
          options={users}
        />
        <ModalFooter>
          <MyButton title="Додати" mr={3} color="teal" type="submit" />
          <MyButton title="Відмінити" color="red" onClick={handleClose} />
        </ModalFooter>
      </form>
    </Box>
  );
};

export default AddExtractForm;

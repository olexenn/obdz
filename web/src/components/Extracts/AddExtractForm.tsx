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
  const { error } = useTypedSelector((state) => state.authReducer);
  const { addExtract, setError, setIsLoading } = useActions();
  const toast = useToast();

  const [state, setState] = useState<IAddExtract>({
    law_number: "",
    qualification: "",
    applicant_first_name: "",
    applicant_last_name: "",
    description: "",
    authority: "",
    user_id: 0,
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "user_id") {
      setState({
        ...state,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleClose = () => {
    if (error) setError("");
    props.onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log(state);
      const { data } = await ExtractApi.addExtract(state);
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
          name="law_number"
          value={state.law_number}
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
          name="applicant_first_name"
          value={state.applicant_first_name}
          onChange={handleInput}
          mt={4}
        />
        <FormInput
          title="Прізвище Потерпілого"
          name="applicant_last_name"
          value={state.applicant_last_name}
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
          name="user_id"
          value={state.user_id}
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

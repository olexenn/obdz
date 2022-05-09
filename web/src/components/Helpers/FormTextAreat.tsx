import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

type Props = {
  value: string;
  name: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  mt?: number;
};

const FormTextArea = (props: Props) => {
  return (
    <FormControl isRequired mt={props.mt}>
      <FormLabel>{props.title}</FormLabel>
      <Textarea
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.title}
      />
    </FormControl>
  );
};

export default FormTextArea;

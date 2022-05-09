import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { IUser } from "../../api/UserApi";

type Props = {
  value: number;
  name: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  mt?: number;
  options: IUser[];
};

const FormSelect = (props: Props) => {
  return (
    <FormControl isRequired mt={props.mt}>
      <FormLabel>{props.title}</FormLabel>
      <Select
        placeholder={props.title}
        onChange={props.onChange}
        name={props.name}
      >
        {props.options.map((option) => {
          return (
            <option value={option.id} key={option.username}>
              {option.first_name + " " + option.last_name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FormSelect;

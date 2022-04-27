import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  isPassword?: boolean;
  title: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mt?: number;
};

const FormInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl isRequired mt={props.mt}>
      <FormLabel>{props.title}</FormLabel>
      {props.isPassword ? (
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={props.title}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          />
          <InputRightElement width="3rem">
            <IconButton
              aria-label="toggle password view"
              size="sm"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={handlePasswordVisibility}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          placeholder={props.title}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.isPassword ? "password" : "text"}
        />
      )}
    </FormControl>
  );
};

export default FormInput;

import { Button, CircularProgress } from "@chakra-ui/react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type Props = {
  color?: string;
  title: string;
  mr?: number;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
};

const MyButton = (props: Props) => {
  const isLoading = useTypedSelector((state) => state.authReducer.isLoading);
  return (
    <Button
      onClick={props.onClick}
      mr={props.mr}
      colorScheme={props.color}
      type={props.type}
    >
      {isLoading ? (
        <CircularProgress isIndeterminate size="24px" color={props.color} />
      ) : (
        <>{props.title}</>
      )}
    </Button>
  );
};

export default MyButton;

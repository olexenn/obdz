import { Button, Td, Tr } from "@chakra-ui/react";
import { IUser } from "../../api/UserApi";

type Props = {
  number: string;
  authority: string;
  user: IUser;
};

const ExtractsItem = (props: Props) => {
  return (
    <Tr>
      <Td>{props.number}</Td>
      <Td>{props.authority}</Td>
      <Td>{props.user.first_name + " " + props.user.last_name}</Td>
      <Td>
        <Button>Детальніше</Button>
      </Td>
    </Tr>
  );
};

export default ExtractsItem;

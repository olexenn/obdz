import { Avatar, Td, Tr } from "@chakra-ui/react";
import { IUser } from "../../api/UserApi";
import MenuActions from "./MenuActions";

type Props = {
  user: IUser;
};

const TableItem = (props: Props) => {
  return (
    <Tr>
      <Td>
        <Avatar name={props.user.username} src={props.user.avatar_url} />
      </Td>
      <Td>{props.user.username}</Td>
      <Td>{props.user.first_name}</Td>
      <Td>{props.user.last_name}</Td>
      <Td>
        <MenuActions user={props.user} />
      </Td>
    </Tr>
  );
};

export default TableItem;

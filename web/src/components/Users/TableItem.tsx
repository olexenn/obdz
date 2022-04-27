import { Avatar, Td, Tr } from "@chakra-ui/react";
import { IUser } from "../../api/UserApi";

type Props = {
  user: IUser;
};

const TableItem = (props: Props) => {
  return (
    <Tr>
      <Td>
        <Avatar name={props.user.username} src={props.user.profilePicture} />
      </Td>
      <Td>{props.user.username}</Td>
      <Td>{props.user.firstName}</Td>
      <Td>{props.user.lastName}</Td>
    </Tr>
  );
};

export default TableItem;

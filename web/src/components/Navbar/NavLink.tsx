import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  children: string;
  to: string;
};

const NavLink = (props: Props) => {
  return (
    <Link to="/">
      <Text display="block">{props.children}</Text>
    </Link>
  );
};

export default NavLink;

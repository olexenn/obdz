import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  children: string;
  to: string;
};

const NavLink = (props: Props) => {
  return (
    <Link to={props.to} as={RouterLink}>
      {props.children}
    </Link>
  );
};

export default NavLink;

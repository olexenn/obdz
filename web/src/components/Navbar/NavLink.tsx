import { Link, Text } from "@chakra-ui/react";

type Props = {
  children: string;
  to: string;
};

const NavLink = (props: Props) => {
  return (
    <Link href={props.to}>
      <Text display="block">{props.children}</Text>
    </Link>
  );
};

export default NavLink;

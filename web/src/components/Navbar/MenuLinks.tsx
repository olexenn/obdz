import { Box, Stack } from "@chakra-ui/react";
import ThemeToggler from "./ThemeToggler";
import AuthButtons from "./AuthButtons";
import NavLink from "./NavLink";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const adminLinks = [
  { route: "/", title: "Додому" },
  { route: "/users", title: "Користувачі" },
];

const userLinks = [{ route: "/", title: "Додому" }];

const MenuLinks = () => {
  const { role } = useTypedSelector((state) => state.authReducer);
  return (
    <Box flexBasis={{ base: "100%", md: "auto" }}>
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
      >
        {role === "admin"
          ? adminLinks.map((link) => {
              return (
                <NavLink key={link.title} to={link.route}>
                  {link.title}
                </NavLink>
              );
            })
          : userLinks.map((link) => {
              return (
                <NavLink key={link.title} to={link.route}>
                  {link.title}
                </NavLink>
              );
            })}
        <ThemeToggler />
        <AuthButtons />
      </Stack>
    </Box>
  );
};

export default MenuLinks;

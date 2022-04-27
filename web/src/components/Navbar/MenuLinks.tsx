import { Box, Stack } from "@chakra-ui/react";
import ThemeToggler from "./ThemeToggler";
import AuthButtons from "./AuthButtons";
import NavLink from "./NavLink";

const MenuLinks = () => {
  return (
    <Box flexBasis={{ base: "100%", md: "auto" }}>
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
      >
        <NavLink to="/">Додому</NavLink>
        <ThemeToggler />
        <AuthButtons />
      </Stack>
    </Box>
  );
};

export default MenuLinks;

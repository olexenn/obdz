import { Box, Flex } from "@chakra-ui/react";

const NavBarContainer = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Box mt={4} w="full" borderWidth={1} borderRadius={8} boxShadow="lg" mb={8}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        px={8}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default NavBarContainer;

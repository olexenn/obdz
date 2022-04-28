import { Box, Image, useColorMode } from "@chakra-ui/react";

const Logo = () => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      {colorMode === "light" ? (
        <Image src="herbBlack.svg" alt="logoLight" boxSize="50" />
      ) : (
        <Image src="herbWhite.svg" alt="logoDark" boxSize="50" />
      )}
    </Box>
  );
};

export default Logo;

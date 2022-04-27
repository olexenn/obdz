import theme from "./utils/theme";
import AppRouter from "./components/AppRouter";
import { ColorModeScript, Container } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import NavBar from "./components/Navbar/NabBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="full" w="full">
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NavBar />
        <AppRouter />
      </Container>
    </ThemeProvider>
  );
}

export default App;

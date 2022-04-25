import theme from "./utils/theme";
import AppRouter from "./components/AppRouter";
import { ColorModeScript } from "@chakra-ui/react";
import ThemeToggler from "./components/ThemeToggler";
import { ThemeProvider } from "@emotion/react";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ThemeToggler />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;

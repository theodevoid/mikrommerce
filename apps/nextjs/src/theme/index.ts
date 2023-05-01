import { ThemeConfig, extendTheme } from "@chakra-ui/react";

import { Container } from "./components/Container";

const theme: ThemeConfig = extendTheme({
  components: {
    Container,
  },
  fonts: {
    heading: `'Barlow', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;

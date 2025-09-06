import "@mantine/core/styles.css";
import "./main.module.css";

import { MantineProvider } from "@mantine/core";
import { Layout } from "src/01_pages/layout";
import { theme } from "./theme";

function App() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Layout />
      </MantineProvider>
    </>
  );
}

export default App;

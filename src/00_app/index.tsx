import "@mantine/core/styles.css";
import "./style.css";
import { mantineTheme } from "./mantine-theme";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import React from "react";
import { queryClient } from "src/05_shared/api";
import { QueryProvider } from "./providers/query-provider";
import { Outlet } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { ErrorModal } from "src/04_entities/error/ui/error-modal";

function App() {
  return (
    <>
      <Provider store={store}>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider defaultColorScheme="auto" theme={mantineTheme}>
          <QueryProvider client={queryClient}>
            <ErrorModal />
            <Outlet />
          </QueryProvider>
        </MantineProvider>
      </Provider>
    </>
  );
}

export default App;

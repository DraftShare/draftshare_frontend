import { MainPage } from "src/01_Pages/main-page";

import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import React from "react";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <>
          <MainPage />
        </>
      </MantineProvider>
    </React.StrictMode>
  );
}

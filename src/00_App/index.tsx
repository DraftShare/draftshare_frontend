import { MainPage } from "src/01_Pages/main-page";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <>
        <MainPage />
      </>
    </MantineProvider>
  </StrictMode>
);

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./00_app/routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// async function enableMocking() {
//   if (process.env.NODE_ENV !== "development") {
//     return;
//   }
//   const { worker } = await import("./05_shared/mock-browser");
//   return worker.start();
// }

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service Worker registered", reg))
      .catch((err) => console.error("SW registration failed", err));
  });
}

// Render the app
// enableMocking().then(() => {
//   const rootElement = document.getElementById("root")!;
//   if (!rootElement.innerHTML) {
//     const root = ReactDOM.createRoot(rootElement);
//     root.render(
//       <StrictMode>
//         <RouterProvider router={router} />
//       </StrictMode>
//     );
//   }
// });

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "src/index.tsx",
    },
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
          routesDirectory: "./src/00_app/routes",
          generatedRouteTree: "./src/00_app/routeTree.gen.ts",
        }),
      ],
    },
  },
  // html: {
  //   tags: [{ tag: "script", attrs: { src: "telegram-web-app.js" } }],
  // },
});

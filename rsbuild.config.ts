import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import { InjectManifest } from "@aaroon/workbox-rspack-plugin";

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    copy: [{ from: "public" }],
  },
  source: {
    entry: {
      index: "src/index.tsx",
    },
  },
  html: {
    tags: [
      {
        tag: "link",
        attrs: {
          rel: "manifest",
          href: "/manifest.json",
        },
      },
    ],
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({
          routesDirectory: "./src/00_app/routes",
          generatedRouteTree: "./src/00_app/routeTree.gen.ts",
        }),

        new InjectManifest({
          swSrc: "./src/service-worker.ts",
          swDest: "service-worker.js",
        }),
      ],
    },
  },
  // html: {
  //   tags: [{ tag: "script", attrs: { src: "telegram-web-app.js" } }],
  // },
});

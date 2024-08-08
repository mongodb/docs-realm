import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { promises as fs } from "fs";

const wasmContentTypePlugin: Plugin = {
  name: "wasm-content-type-plugin",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url && req.url.endsWith(".wasm")) {
        res.setHeader("Content-Type", "application/wasm");

        const wasmPath = path.join(
          __dirname,
          "node_modules/realm/dist",
          path.basename(req.url)
        );
        const realmWasm = await fs.readFile(wasmPath);

        res.write(realmWasm);
        res.end();
      } else {
        next();
      }
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasmContentTypePlugin],
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      supported: {
        "top-level-await": true,
      },
    },
  },
});

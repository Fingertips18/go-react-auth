import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig as viteConfig } from "vite";
import { defineConfig as testConfig } from "vitest/config";

const defineViteConfig = viteConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

const defineTestConfig = testConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});

export default {
  ...defineViteConfig,
  ...defineTestConfig,
};

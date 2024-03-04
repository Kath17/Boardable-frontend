import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   "/api": "http://localhost:5500/",
    // },
    port: 5173,
    host: "0.0.0.0",
  },
});

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { ThemeProvider } from "@/lib/providers/theme-provider.tsx";
import QueryProvider from "@/lib/providers/query-provider.tsx";
import ToastProvider from "@/lib/providers/toast-provider.tsx";

import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <BrowserRouter>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BrowserRouter>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);

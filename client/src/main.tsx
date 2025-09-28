import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import QueryProvider from "@/lib/providers/query-provider.tsx";
import { ThemeProvider } from "@/lib/providers/theme-provider.tsx";
import ToastProvider from "@/lib/providers/toast-provider.tsx";

import App from "./App.tsx";

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

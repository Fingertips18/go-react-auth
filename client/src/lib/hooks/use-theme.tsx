import { useContext } from "react";

import { ThemeProviderContext } from "@/lib/providers/theme-provider";

export enum Theme {
  System = "system",
  Light = "light",
  Dark = "dark",
}

const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { useTheme };

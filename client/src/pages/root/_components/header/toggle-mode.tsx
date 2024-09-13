import { Moon, Sun } from "lucide-react";

import { Theme, useTheme } from "@/lib/hooks/use-theme";

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    if (theme === Theme.Light) {
      setTheme(Theme.Dark);
    } else {
      setTheme(Theme.Light);
    }
  };

  return (
    <button
      className="w-10 h-10 rounded-full flex-center transition-colors bg-accent/40 hover:bg-accent hover:drop-shadow-accent-glow"
      onClick={onClick}
    >
      {theme === Theme.Light ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
};

export { ToggleMode };

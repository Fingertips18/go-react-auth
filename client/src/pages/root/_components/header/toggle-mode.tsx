import { Moon, Sun } from "lucide-react";

import { Theme, useTheme } from "@/lib/hooks/use-theme";
import IconButton from "@/components/icon-button";

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
    <IconButton onClick={onClick} icon={theme === Theme.Light ? Sun : Moon} />
  );
};

export { ToggleMode };

import { Moon, Sun } from "lucide-react";

import { Hint } from "@/components/hint";
import IconButton from "@/components/icon-button";
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
    <>
      <a data-tooltip-id="toggle-mode">
        <IconButton
          onClick={onClick}
          icon={theme === Theme.Light ? Sun : Moon}
        />
      </a>
      <Hint id="toggle-mode" content="Theme" isAccent />
    </>
  );
};

export { ToggleMode };

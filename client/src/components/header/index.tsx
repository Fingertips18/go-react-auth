import { ToggleMode } from "./toggle-mode";
import { Logo } from "./logo";

const Header = () => {
  return (
    <header className="h-14 w-full fixed top-0 bg-secondary/10 backdrop-blur-lg border-b border-secondary/25 shadow-sm px-4 lg:px-0">
      <nav className="max-w-screen-lg mx-auto h-full flex-between">
        <Logo />
        <ToggleMode />
      </nav>
    </header>
  );
};

export { Header };

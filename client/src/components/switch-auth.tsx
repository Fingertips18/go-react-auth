import { Link } from "react-router-dom";

interface SwitchAuthProps {
  label?: string;
  tag: string;
  href: string;
  disabled?: boolean;
}

const SwitchAuth = ({ label, tag, href, disabled }: SwitchAuthProps) => {
  return (
    <div
      className="p-4 w-full text-sm lg:text-base rounded-md border 
      border-secondary/50 bg-secondary/15 drop-shadow-2xl flex-center gap-x-2"
    >
      {label && <p className="font-medium">{label}</p>}
      <Link
        to={href}
        replace
        className={`font-bold underline-offset-4 hover:underline transition-all hover:drop-shadow-secondary-glow
          ${disabled} ? "text-secondary/50 pointer-events-none" : "text-secondary"
          `}
      >
        {tag}
      </Link>
    </div>
  );
};

export { SwitchAuth };

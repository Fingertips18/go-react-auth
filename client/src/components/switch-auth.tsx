import { Link } from "react-router-dom";

interface SwitchAuthProps {
  label: string;
  tag: string;
  href: string;
}

const SwitchAuth = ({ label, tag, href }: SwitchAuthProps) => {
  return (
    <div className="p-4 w-[400px] rounded-md border border-secondary/50 bg-secondary/15 drop-shadow-2xl flex-center gap-x-2">
      <p className="font-medium">{label}</p>
      <Link
        to={href}
        className="font-bold underline-offset-4 hover:underline text-secondary transition-all hover:drop-shadow-secondary-glow"
      >
        {tag}
      </Link>
    </div>
  );
};

export { SwitchAuth };

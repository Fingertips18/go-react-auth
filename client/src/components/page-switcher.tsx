import { useState } from "react";
import { Link } from "react-router-dom";

interface PageSwitcherProps {
  label?: string;
  tag: string;
  href: string;
  disabled?: boolean;
  isPrimary?: boolean;
  isAccent?: boolean;
}

const PageSwitcher = ({
  label,
  tag,
  href,
  disabled,
  isPrimary,
  isAccent,
}: PageSwitcherProps) => {
  const [hovered, setHovered] = useState(false);

  let color;

  if (isPrimary) {
    color = "primary";
  } else if (isAccent) {
    color = "accent";
  } else {
    color = "secondary";
  }

  return (
    <div
      className="p-4 w-full text-sm lg:text-base rounded-md border flex-center drop-shadow-2xl gap-x-2"
      style={{
        borderColor: `rgb(var(--${color})/0.5)`,
        backgroundColor: `rgb(var(--${color})/0.15)`,
      }}
    >
      {label && <p className="font-medium">{label}</p>}
      <Link
        to={href}
        replace
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`font-bold underline-offset-4 hover:underline transition-all 
          ${disabled && `pointer-events-none`} 
        `}
        style={{
          filter: hovered
            ? `drop-shadow(0 0px 25px rgb(var(--${color}))) drop-shadow(0 0px 50px rgb(var(--${color})))`
            : "none",
          color: disabled ? `rgb(var(--${color})/0.5)` : `rgb(var(--${color}))`,
        }}
      >
        {tag}
      </Link>
    </div>
  );
};

export { PageSwitcher };

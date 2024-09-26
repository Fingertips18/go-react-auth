import { Loader2, LucideProps } from "lucide-react";

import { useResize } from "@/lib/hooks/use-resize";

interface IconButtonProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const IconButton = ({
  icon: Icon,
  onClick,
  disabled,
  loading,
}: IconButtonProps) => {
  const { width } = useResize();

  const lg = width > 1024;

  const size = lg ? 22 : 16;

  return (
    <button
      className="w-8 lg:w-10 h-8 lg:h-10 rounded-full flex-center transition-colors bg-accent/40 
        hover:bg-accent hover:drop-shadow-accent-glow disabled:pointer-events-none
        disabled:bg-accent/50 disabled:text-foreground/50"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Loader2 size={size} /> : <Icon size={size} />}
    </button>
  );
};

export default IconButton;

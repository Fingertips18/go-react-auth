import { Loader2, LucideProps } from "lucide-react";

interface IconButtonProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  size?: number;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const IconButton = ({
  icon: Icon,
  size = 22,
  onClick,
  disabled,
  loading,
}: IconButtonProps) => {
  return (
    <button
      className="w-10 h-10 rounded-full flex-center transition-colors bg-accent/40 
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

import { Loader2 } from "lucide-react";

interface TextButtonProps {
  label: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  loading?: boolean;
}

const TextButton = ({
  label,
  onClick,
  type,
  disabled,
  loading,
}: TextButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full h-10 p-4 lg:p-6 rounded-lg bg-accent transition-all hover:drop-shadow-accent-glow border-2 border-transparent hover:border-white/50
        flex-center font-bold lg:text-lg active:scale-90 disabled:bg-accent/50 disabled:text-foreground/50 disabled:pointer-events-none"
    >
      {loading ? <Loader2 className="animate-spin duration-200" /> : label}
    </button>
  );
};

export { TextButton as Button };

import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import { Eye, EyeOff, Info, LucideProps } from "lucide-react";
import { Tooltip } from "react-tooltip";

interface InputProps {
  name?: string;
  label: string;
  tooltip: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute | undefined;
  autoComplete: React.HTMLInputAutoCompleteAttribute | undefined;
  suffixIcon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  disabled?: boolean;
  validation: (value: string) => boolean;
  required?: boolean;
  maxLength?: number;
}

const Input = ({
  name,
  label,
  tooltip,
  placeholder,
  type,
  autoComplete,
  suffixIcon: SuffixIcon,
  disabled,
  validation,
  required,
  maxLength,
}: InputProps) => {
  const [value, setValue] = useState("");
  const [obscure, setObscure] = useState(true);
  const [valid, setValid] = useState(false);

  const isPasswod = type === "password";
  const hasInput = value.length > 0;

  useEffect(() => {
    setValid(validation(value));
  }, [validation, value]);

  return (
    <div className="space-y-1.5 flex flex-col">
      <div className="flex-between px-1.5">
        <label
          className="text-sm font-semibold uppercase"
          htmlFor={name?.toLowerCase() ?? label.toLowerCase()}
        >
          {label}
        </label>
        <Info
          size={16}
          className="text-primary cursor-help"
          data-tooltip-id={label}
          data-tooltip-content={tooltip}
        />
        <Tooltip
          id={label}
          style={{
            backgroundColor: "rgb(var(--primary))",
            color: "rgb(var(--foreground))",
            fontWeight: "bold",
          }}
        />
      </div>
      <div className="relative flex-center">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={isPasswod ? (obscure ? "password" : "text") : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          id={name?.toLowerCase() ?? label.toLowerCase()}
          name={name?.toLowerCase() ?? label.toLowerCase()}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          className={`w-full md:w-[400px] bg-background p-2.5 rounded-lg outline-none border ring-1 focus:ring-2 transition-all placeholder-foreground/50 
            px-11 disabled:bg-opacity-25 disabled:border-primary/25 disabled:text-foreground/50 disabled:pointer-events-none
            ${
              hasInput
                ? valid
                  ? "border-green-400 focus:border-transparent ring-green-400 focus:ring-green-500"
                  : "border-red-400 focus:border-transparent ring-red-400 focus:ring-red-500"
                : "border-primary/50 focus:border-transparent ring-primary/50 focus:ring-primary"
            }`}
        />
        <div className="absolute inset-y-0 left-0 flex-center pl-3 pointer-events-none">
          <SuffixIcon size={24} className="text-primary" />
        </div>
        {isPasswod && (
          <button
            type="button"
            onClick={() => setObscure(!obscure)}
            className="absolute inset-y-0 right-0 flex-center pr-3 active:scale-90 transition hover:drop-shadow-primary-glow"
          >
            {obscure ? (
              <EyeOff size={24} className="text-primary" />
            ) : (
              <Eye size={24} className="text-primary" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export { Input };

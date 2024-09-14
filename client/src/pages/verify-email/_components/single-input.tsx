import { ChangeEventHandler, KeyboardEventHandler, LegacyRef } from "react";

interface SingleInputProps {
  name: string;
  iref: LegacyRef<HTMLInputElement> | undefined;
  digit: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyDown: KeyboardEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
}

const SingleInput = ({
  name,
  iref,
  digit,
  onChange,
  onKeyDown,
  disabled,
}: SingleInputProps) => {
  return (
    <input
      name={name}
      ref={iref}
      type="text"
      maxLength={4}
      value={digit}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoComplete="off"
      disabled={disabled}
      className="w-12 h-12 text-center text-2xl font-bold bg-background rounded-lg outline-none border ring-1 focus:ring-2 
      transition-all placeholder-foreground/50  disabled:bg-opacity-25 disabled:border-primary/25 disabled:text-foreground/50 
      disabled:pointer-events-none"
    />
  );
};

export { SingleInput };

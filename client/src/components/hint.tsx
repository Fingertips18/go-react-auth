import { Tooltip } from "react-tooltip";

interface HintProps {
  id: string;
  content: string;
  isSecondary?: boolean;
  isAccent?: boolean;
}

const Hint = ({ id, content, isSecondary, isAccent }: HintProps) => {
  let color;

  if (isSecondary) {
    color = "secondary";
  } else if (isAccent) {
    color = "accent";
  } else {
    color = "primary";
  }

  return (
    <Tooltip
      id={id}
      content={content}
      className={`backdrop-blur-2xl border border-primary/50 drop-shadow-${color}-glow`}
      style={{
        backgroundColor: `rgb(var(--${color})/0.1)`,
        color: "rgb(var(--foreground))",
      }}
    />
  );
};

export { Hint };

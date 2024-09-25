import { WAVE } from "@/constants/assets";

interface WelcomeUserProps {
  name?: string;
}

const WelcomeUser = ({ name }: WelcomeUserProps) => {
  return (
    <div className="w-full rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl">
      <h2
        className="text-lg lg:text-2xl font-extrabold flex-center uppercase 
        text-primary drop-shadow-primary-glow animate-pulse p-4 gap-x-4"
      >
        <span className="text-foreground flex-center gap-x-4 relative">
          Hi there{" "}
          <img src={WAVE} alt="wave" className="size-8 relative -top-[3px]" />
        </span>
        {name}
      </h2>
      <div className="w-full bg-primary/25 p-2.5 flex-center border-t border-primary/50">
        <p className="text-xs lg:text-base text-center lg:max-w-[324px] text-foreground/60 font-semibold">
          Welcome to Go + React Auth
        </p>
      </div>
    </div>
  );
};

export { WelcomeUser };

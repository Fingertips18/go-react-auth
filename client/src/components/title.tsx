interface TitleProps {
  title: string;
  body?: string;
}

const Title = ({ title, body }: TitleProps) => {
  return (
    <div className="w-full rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl">
      <h2
        className="text-lg lg:text-2xl font-extrabold text-center uppercase 
        bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent
        drop-shadow-primary-glow animate-pulse p-4"
      >
        {title}
      </h2>
      {body && (
        <div className="w-full bg-primary/25 p-2.5 flex-center border-t border-primary/50">
          <p className="text-xs lg:text-base text-center lg:max-w-[324px] text-foreground/60 font-medium">
            {body}
          </p>
        </div>
      )}
    </div>
  );
};

export { Title };

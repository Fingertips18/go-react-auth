import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <section className="flex-center bg-primary/5 w-full h-full absolute z-50">
      <div className="p-4 rounded-full border border-primary/80 bg-primary/15 drop-shadow-primary-glow backdrop-blur-lg ">
        <Loader2
          className="text-primary animate-spin duration-200 transition-transform"
          size={32}
        />
      </div>
    </section>
  );
};

export { Loading };

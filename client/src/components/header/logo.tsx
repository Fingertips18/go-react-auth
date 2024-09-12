import { Link } from "react-router-dom";

import { AppRoutes } from "@/constants/routes";
import { KEY } from "@/constants/assets";

const Logo = () => {
  return (
    <h1 className="transition-all ease-in-out duration-200 drop-shadow-lg hover:drop-shadow-secondary-glow hover:scale-95">
      <Link to={AppRoutes.Root} className="flex items-center gap-x-2">
        <img src={KEY} alt="Key Logo" className="w-8 h-8" loading="lazy" />
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-none text-secondary">
            Go
          </span>
          <span className="font-semibold leading-none">React Auth</span>
        </div>
      </Link>
    </h1>
  );
};

export { Logo };

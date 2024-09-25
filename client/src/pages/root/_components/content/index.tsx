import { useUserStore } from "@/lib/stores/user-store";
import { formatDate } from "@/lib/utils/date";

import { WelcomeUser } from "./welcome-user";
import { InfoPair } from "./info-pair";

const Content = () => {
  const { user } = useUserStore();

  return (
    <section className="h-[calc(100dvh_-_56px)] flex-center max-w-screen-lg mx-auto px-4 lg:px-0">
      <div className="w-fit space-y-6">
        <WelcomeUser name={user?.username} />

        <div className="w-full rounded-md border border-secondary/50 bg-secondary/15 drop-shadow-2xl">
          <InfoPair label="Email" value={user?.email_address} />
          <InfoPair
            label="Last Visit"
            value={formatDate(new Date(user!.last_signed_in).toDateString())}
          />
          <InfoPair
            label="Joined"
            value={new Date(user!.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          <InfoPair label="Verified" value={user!.is_verified ? "Yes" : "No"} />
        </div>
      </div>
    </section>
  );
};

export { Content };

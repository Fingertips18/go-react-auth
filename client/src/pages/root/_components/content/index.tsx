import { useUserStore } from "@/lib/stores/user-store";
import { formatDate } from "@/lib/utils/date";

import { ChangePassword } from "./change-password";
import { InfoPair } from "./info-pair";
import { WelcomeUser } from "./welcome-user";

const Content = () => {
  const { user } = useUserStore();

  return (
    <section className="h-[calc(100dvh-56px)] flex-center max-w-(--breakpoint-lg) mx-auto px-4 lg:px-0">
      <div className="w-full sm:w-fit space-y-6">
        <WelcomeUser name={user?.username} />

        <div className="w-full rounded-md border border-secondary/50 bg-secondary/15 drop-shadow-2xl">
          <InfoPair label="Email" value={user?.email_address} />
          <InfoPair
            label="Last Visit"
            value={
              user?.last_signed_in
                ? formatDate(new Date(user.last_signed_in).toISOString())
                : undefined
            }
          />
          <InfoPair
            label="Joined"
            value={
              user?.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : undefined
            }
          />
          <InfoPair label="Verified" value={user?.is_verified ? "Yes" : "No"} />
        </div>

        <ChangePassword />
      </div>
    </section>
  );
};

export { Content };

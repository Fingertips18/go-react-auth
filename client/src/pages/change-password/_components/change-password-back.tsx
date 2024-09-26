import { PageSwitcher } from "@/components/page-switcher";
import { useAuthStore } from "@/lib/stores/auth-store";
import { AppRoutes } from "@/constants/routes";

const ChangePasswordBack = () => {
  const { loading } = useAuthStore();

  return <PageSwitcher href={AppRoutes.Root} tag="Back" disabled={loading} />;
};

export { ChangePasswordBack };

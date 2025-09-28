import { PageSwitcher } from "@/components/page-switcher";
import { AppRoutes } from "@/constants/routes";
import { useAuthStore } from "@/lib/stores/auth-store";

const ChangePasswordBack = () => {
  const { loading } = useAuthStore();

  return <PageSwitcher href={AppRoutes.Root} tag="Back" disabled={loading} />;
};

export { ChangePasswordBack };

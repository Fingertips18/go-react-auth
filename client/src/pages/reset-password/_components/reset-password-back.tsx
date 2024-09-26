import { PageSwitcher } from "@/components/page-switcher";
import { useAuthStore } from "@/lib/stores/auth-store";
import { AppRoutes } from "@/constants/routes";

const ResetPasswordBack = () => {
  const { loading } = useAuthStore();

  return <PageSwitcher href={AppRoutes.SignIn} tag="Back" disabled={loading} />;
};

export { ResetPasswordBack };

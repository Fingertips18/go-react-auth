import { PageSwitcher } from "@/components/page-switcher";
import { AppRoutes } from "@/constants/routes";
import { useAuthStore } from "@/lib/stores/auth-store";

const ForgotPasswordBack = () => {
  const { loading } = useAuthStore();

  return <PageSwitcher href={AppRoutes.SignIn} tag="Back" disabled={loading} />;
};

export { ForgotPasswordBack };

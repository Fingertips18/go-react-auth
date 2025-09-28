import { PageSwitcher } from "@/components/page-switcher";
import { AppRoutes } from "@/constants/routes";
import { useAuthStore } from "@/lib/stores/auth-store";

const NoAccountYet = () => {
  const { loading } = useAuthStore();

  return (
    <PageSwitcher
      label="Don't have an account yet?"
      tag="Sign Up"
      href={AppRoutes.SignUp}
      disabled={loading}
    />
  );
};

export { NoAccountYet };

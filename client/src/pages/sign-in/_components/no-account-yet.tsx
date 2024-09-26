import { PageSwitcher } from "@/components/page-switcher";
import { useAuthStore } from "@/lib/stores/auth-store";
import { AppRoutes } from "@/constants/routes";

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

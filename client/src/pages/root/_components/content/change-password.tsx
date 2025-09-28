import { PageSwitcher } from "@/components/page-switcher";
import { AppRoutes } from "@/constants/routes";
import { useAuthStore } from "@/lib/stores/auth-store";

const ChangePassword = () => {
  const { loading } = useAuthStore();

  return (
    <PageSwitcher
      label="Want to update your password?"
      tag="Change"
      href={AppRoutes.ChangePassword}
      isAccent
      disabled={loading}
    />
  );
};

export { ChangePassword };

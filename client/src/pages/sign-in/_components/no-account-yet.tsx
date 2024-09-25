import { useAuthStore } from "@/lib/stores/auth-store";
import { SwitchAuth } from "@/components/switch-auth";
import { AppRoutes } from "@/constants/routes";

const NoAccountYet = () => {
  const { loading } = useAuthStore();

  return (
    <SwitchAuth
      label="Don't have an account yet?"
      tag="Sign Up"
      href={AppRoutes.SignUp}
      disabled={loading}
    />
  );
};

export { NoAccountYet };

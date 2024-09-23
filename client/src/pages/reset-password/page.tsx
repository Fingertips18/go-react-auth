import { SwitchAuth } from "@/components/switch-auth";
import { AuthTitle } from "@/components/auth-title";
import { AppRoutes } from "@/constants/routes";

import { ResetPasswordForm } from "./_components/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle title="Reset Password" />

      <ResetPasswordForm />

      <SwitchAuth href={AppRoutes.Root} tag="Back" />
    </section>
  );
};

export { ResetPasswordPage };

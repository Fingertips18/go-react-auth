import { AuthTitle } from "@/components/auth-title";

import { ResetPasswordForm } from "./_components/reset-password-form";
import { ResetPasswordBack } from "./_components/reset-password-back";

const ResetPasswordPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle title="Reset Password" />

      <ResetPasswordForm />

      <ResetPasswordBack />
    </section>
  );
};

export { ResetPasswordPage };

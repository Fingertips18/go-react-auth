import { Title } from "@/components/title";

import { ResetPasswordBack } from "./_components/reset-password-back";
import { ResetPasswordForm } from "./_components/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <Title title="Reset Password" />

      <ResetPasswordForm />

      <ResetPasswordBack />
    </section>
  );
};

export { ResetPasswordPage };

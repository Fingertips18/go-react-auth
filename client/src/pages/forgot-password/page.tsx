import { Title } from "@/components/title";

import { ForgotPasswordForm } from "./_components/forgot-password-form";
import { ForgotPasswordBack } from "./_components/forgot-password-back";

const ForgotPasswordPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <Title
        title="Forgot Password"
        body="Enter your email address and wait for a reset password link to be sent."
      />

      <ForgotPasswordForm />

      <ForgotPasswordBack />
    </section>
  );
};

export { ForgotPasswordPage };

import { AuthTitle } from "@/components/auth-title";

import { VerifyEmailForm } from "./_components/verify-email-form";
import { ResendCode } from "./_components/resend-code";

const VerifyEmailPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle title="Verify Email" />

      <VerifyEmailForm />

      <ResendCode />
    </section>
  );
};

export default VerifyEmailPage;

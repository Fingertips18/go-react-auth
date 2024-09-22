import { VerifyEmailForm } from "./_components/verify-email-form";
import { ResendCode } from "./_components/resend-code";

const VerifyEmailPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <h2
        className="text-lg lg:text-2xl font-extrabold text-center uppercase w-full
        rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl p-4"
      >
        Verify Email
      </h2>

      <VerifyEmailForm />

      <ResendCode />
    </section>
  );
};

export default VerifyEmailPage;

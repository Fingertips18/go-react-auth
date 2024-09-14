import { VerifyEmailForm } from "./_components/verify-email-form";
import { ResendCode } from "./_components/resend-code";

const VerifyEmailPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center">
      <div className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6">
        <h2 className="text-lg lg:text-2xl font-extrabold text-center uppercase">
          Verify Email
        </h2>

        <VerifyEmailForm />

        <ResendCode />
      </div>
    </section>
  );
};

export default VerifyEmailPage;

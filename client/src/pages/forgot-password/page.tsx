import { SwitchAuth } from "@/components/switch-auth";
import { ForgotPasswordForm } from "./_components/forgot-password-form";
import { AppRoutes } from "@/constants/routes";

const ForgotPasswordPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <div className="w-full rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl">
        <h2 className="text-lg lg:text-2xl font-extrabold text-center uppercase pt-4 pb-2">
          Forgot Password
        </h2>
        <div className="w-full bg-primary/25 p-2.5 flex-center border-t border-primary/50">
          <p className="text-xs lg:text-base text-center lg:max-w-[324px] text-foreground/60 font-medium">
            Enter your email address and wait for a reset password link to be
            sent.
          </p>
        </div>
      </div>

      <ForgotPasswordForm />

      <SwitchAuth href={AppRoutes.Root} tag="Back" />
    </section>
  );
};

export { ForgotPasswordPage };

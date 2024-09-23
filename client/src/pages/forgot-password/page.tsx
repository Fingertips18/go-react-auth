import { SwitchAuth } from "@/components/switch-auth";
import { ForgotPasswordForm } from "./_components/forgot-password-form";
import { AppRoutes } from "@/constants/routes";
import { AuthTitle } from "@/components/auth-title";

const ForgotPasswordPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle
        title="Forgot Password"
        body="Enter your email address and wait for a reset password link to be sent."
      />

      <ForgotPasswordForm />

      <SwitchAuth href={AppRoutes.Root} tag="Back" />
    </section>
  );
};

export { ForgotPasswordPage };

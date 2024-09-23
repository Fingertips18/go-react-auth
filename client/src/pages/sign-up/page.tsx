import { SwitchAuth } from "@/components/switch-auth";
import { AuthTitle } from "@/components/auth-title";
import { AppRoutes } from "@/constants/routes";
import { Or } from "@/components/or";

import { SignUpForm } from "./_components/sign-up-form";

const SignUpPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle title="Create Account" />

      <SignUpForm />

      <Or />

      <SwitchAuth
        label="Already have an account?"
        tag="Sign In"
        href={AppRoutes.SignIn}
      />
    </section>
  );
};

export default SignUpPage;

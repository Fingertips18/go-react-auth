import { SwitchAuth } from "@/components/switch-auth";
import { AuthTitle } from "@/components/auth-title";
import { AppRoutes } from "@/constants/routes";
import { Or } from "@/components/or";

import { SignInForm } from "./_components/sign-in-form";

const SignInPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle title="Access Your Account" />

      <SignInForm />

      <Or />

      <SwitchAuth
        label="Don't have an account yet?"
        tag="Sign Up"
        href={AppRoutes.SignUp}
      />
    </section>
  );
};

export default SignInPage;

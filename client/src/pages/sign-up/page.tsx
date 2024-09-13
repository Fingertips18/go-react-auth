import { SwitchAuth } from "@/components/switch-auth";
import { AppRoutes } from "@/constants/routes";
import { Or } from "@/components/or";

import { SignUpForm } from "./_components/sign-up-form";

const SignUpPage = () => {
  return (
    <section className="h-full flex-center flex-center flex-col gap-y-6">
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

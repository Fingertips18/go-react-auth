import { SwitchAuth } from "@/components/switch-auth";
import { AppRoutes } from "@/constants/routes";
import { Or } from "@/components/or";

import { SignUpForm } from "./_components/sign-up-form";

const SignUpPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <h2
        className="text-lg lg:text-2xl font-extrabold text-center uppercase w-full
        rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl p-4"
      >
        Create Account
      </h2>

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

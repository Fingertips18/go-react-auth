import { AuthTitle } from "@/components/auth-title";
import { Or } from "@/components/or";

import { AlreadyHaveAccount } from "./_components/already-have-account";
import { SignUpForm } from "./_components/sign-up-form";

const SignUpPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle title="Create Account" />

      <SignUpForm />

      <Or />

      <AlreadyHaveAccount />
    </section>
  );
};

export default SignUpPage;

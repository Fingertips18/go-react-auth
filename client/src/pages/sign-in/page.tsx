import { AuthTitle } from "@/components/auth-title";
import { Or } from "@/components/or";

import { NoAccountYet } from "./_components/no-account-yet";
import { SignInForm } from "./_components/sign-in-form";

const SignInPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <AuthTitle title="Access Your Account" />

      <SignInForm />

      <Or />

      <NoAccountYet />
    </section>
  );
};

export default SignInPage;

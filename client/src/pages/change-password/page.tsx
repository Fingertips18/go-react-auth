import { Title } from "@/components/title";

import { ChangePasswordBack } from "./_components/change-password-back";
import { ChangePasswordForm } from "./_components/change-password-form";

const ChangePasswordPage = () => {
  return (
    <section className="px-4 lg:px-0 h-full flex-center flex-col gap-y-6 w-fit mx-auto">
      <Title title="Change Password" />

      <ChangePasswordForm />

      <ChangePasswordBack />
    </section>
  );
};

export { ChangePasswordPage };

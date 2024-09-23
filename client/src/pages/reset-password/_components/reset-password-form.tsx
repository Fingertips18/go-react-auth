import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

import { RESET_PASSWORD_INPUTS } from "@/constants/collections";
import { RESETPASSWORDKEY } from "@/constants/keys";
import { Button } from "@/components/text-button";
import { Input } from "@/components/input";

const ResetPasswordForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isPending } = useMutation({
    mutationKey: [RESETPASSWORDKEY],
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6"
    >
      {RESET_PASSWORD_INPUTS.map((r) => (
        <Input
          key={r.label}
          required
          disabled={isPending}
          {...r}
          validation={(value) => {
            if (r.name === "new-password") {
              setConfirmPassword(value);
            }
            if (r.name === undefined) {
              return r.validation({
                pass1: value,
                pass2: confirmPassword,
              });
            }

            return r.validation(value);
          }}
        />
      ))}

      <Button
        label="Sign In"
        disabled={isPending}
        loading={isPending}
        type="submit"
      />
    </form>
  );
};

export { ResetPasswordForm };

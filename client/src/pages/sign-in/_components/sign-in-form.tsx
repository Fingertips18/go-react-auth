import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { toast } from "sonner";

import { AuthService } from "@/lib/services/auth-service";
import { SIGNININPUTS } from "@/constants/collections";
import { SignInDTO } from "@/lib/DTO/sign-in.dto";
import { Button } from "@/components/text-button";
import { AppRoutes } from "@/constants/routes";
import { SIGNINKEY } from "@/constants/keys";
import { Input } from "@/components/input";

const SignInForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [SIGNINKEY],
    mutationFn: AuthService.signIn,
    onSuccess: () => {
      toast.success("Welcome! You have signed in");
      navigate(AppRoutes.Root);
    },
    onError: ({ message }) => toast.error(message || "Unable to sign in"),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const signInData = Object.fromEntries(formData.entries()) as SignInDTO;

    mutate(signInData);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6"
    >
      <h2 className="text-lg lg:text-2xl font-extrabold text-center uppercase">
        Access Your Account
      </h2>

      {SIGNININPUTS.map((s) => (
        <Input
          key={s.label}
          required
          disabled={isPending}
          {...s}
          validation={s.validation}
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

export { SignInForm };

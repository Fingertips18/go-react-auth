import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { ErrorResponse } from "@/lib/classes/error-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { SIGNUPINPUTS } from "@/constants/collections";
import { SignUpDTO } from "@/lib/DTO/sign-up-dto";
import { Button } from "@/components/text-button";
import { AppRoutes } from "@/constants/routes";
import { SIGNUPKEY } from "@/constants/keys";
import { Input } from "@/components/input";

const SignUpForm = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [SIGNUPKEY],
    mutationFn: AuthService.signUp,
    onSuccess: () => {
      toast.success("Registered successfully");
      navigate(AppRoutes.SignIn);
    },
    onError: (error: ErrorResponse) => toast.error(error.message),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const signUpData = Object.fromEntries(formData.entries()) as SignUpDTO;

    mutate(signUpData);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6"
    >
      <h2 className="text-lg lg:text-2xl font-extrabold text-center uppercase">
        Create Account
      </h2>

      {SIGNUPINPUTS.map((s) => (
        <Input
          key={s.label}
          required
          disabled={isPending}
          {...s}
          validation={(value) => {
            if (s.name === "password") {
              setConfirmPassword(value);
            }
            if (s.name === undefined) {
              return s.validation({
                pass1: value,
                pass2: confirmPassword,
              });
            }

            return s.validation(value);
          }}
        />
      ))}

      <Button
        label="Sign Up"
        disabled={isPending}
        loading={isPending}
        type="submit"
      />
    </form>
  );
};

export { SignUpForm };

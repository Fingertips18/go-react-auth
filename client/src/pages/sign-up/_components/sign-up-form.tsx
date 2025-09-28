import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Input } from "@/components/input";
import { Button } from "@/components/text-button";
import { SIGNUP_INPUTS } from "@/constants/collections";
import { SIGNUPKEY } from "@/constants/keys";
import { AppRoutes } from "@/constants/routes";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { GenericResponse } from "@/lib/classes/generic-response-class";
import { SignUpDTO } from "@/lib/DTO/sign-up-dto";
import { AuthService } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/auth-store";

const SignUpForm = () => {
  const { setLoading: setGlobalLoading } = useAuthStore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [SIGNUPKEY],
    mutationFn: AuthService.signUp,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      setGlobalLoading(false);
      navigate(AppRoutes.SignIn);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
      setGlobalLoading(false);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const raw = Object.fromEntries(formData.entries());

    if (
      typeof raw.username !== "string" ||
      typeof raw.email !== "string" ||
      typeof raw.password !== "string"
    ) {
      throw new Error("Invalid form data");
    }

    const signUpData: SignUpDTO = {
      username: raw.username,
      email: raw.email,
      password: raw.password,
    };

    setGlobalLoading(true);

    mutate(signUpData);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6"
    >
      {SIGNUP_INPUTS.map((s) => (
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

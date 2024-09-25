import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { SIGNIN_INPUTS } from "@/constants/collections";
import { useAuthStore } from "@/lib/stores/auth-store";
import { SignInDTO } from "@/lib/DTO/sign-in-dto";
import { Button } from "@/components/text-button";
import { AppRoutes } from "@/constants/routes";
import { SIGNINKEY } from "@/constants/keys";
import { Input } from "@/components/input";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    setEmail,
    setAuthorized,
    setLoading: setGlobalLoading,
  } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationKey: [SIGNINKEY],
    mutationFn: AuthService.signIn,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      setAuthorized(true);
      setGlobalLoading(false);
    },
    onError: (error: ErrorResponse) => {
      if (error.status == 403) {
        toast.error("Please verify to sign in");
        setGlobalLoading(false);
        navigate(AppRoutes.VerifyEmail);
      } else {
        toast.error(error.message);
        setAuthorized(false);
        setGlobalLoading(false);
      }
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const signInData = Object.fromEntries(formData.entries()) as SignInDTO;

    setEmail(signInData.email);
    setGlobalLoading(true);

    mutate(signInData);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6"
    >
      {SIGNIN_INPUTS.map((i) => (
        <Input
          key={i.label}
          required
          disabled={isPending}
          {...i}
          validation={i.validation}
        />
      ))}

      <Link
        to={AppRoutes.ForgotPassword}
        className="text-sm font-medium hover:underline underline-offset-4 transition-all text-foreground 
          hover:text-primary px-1.5 inline-block text-end w-full"
      >
        Forgot Password?
      </Link>

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

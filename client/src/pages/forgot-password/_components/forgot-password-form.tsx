import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { ForgotPasswordDTO } from "@/lib/DTO/forgot-password-dto";
import { AuthService } from "@/lib/services/auth-service";
import { ValidateEmail } from "@/lib/utils/validations";
import { FORGOTPASSWORDKEY } from "@/constants/keys";
import { Button } from "@/components/text-button";
import { AppRoutes } from "@/constants/routes";
import { Input } from "@/components/input";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [FORGOTPASSWORDKEY],
    mutationFn: AuthService.forgotPassword,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      navigate(AppRoutes.ResetPassword);
    },
    onError: (error: ErrorResponse) => toast.error(error.message),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const forgotPasswordData = Object.fromEntries(
      formData.entries()
    ) as ForgotPasswordDTO;

    mutate(forgotPasswordData.email);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6"
    >
      <Input
        required
        name="email"
        label="Email Address"
        tooltip="Please enter a valid email address. Ensure it includes an '@' symbol and a domain name."
        placeholder="e.g. john@domain.com"
        type="email"
        autoComplete="email"
        suffixIcon={Mail}
        validation={ValidateEmail}
        maxLength={320}
      />

      <Button
        label="Send Reset Link"
        disabled={isPending}
        loading={isPending}
        type="submit"
      />
    </form>
  );
};

export { ForgotPasswordForm };

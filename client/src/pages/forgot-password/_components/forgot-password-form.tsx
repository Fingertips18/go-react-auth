import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { ValidateEmail } from "@/lib/utils/validations";
import { FORGOTPASSWORDKEY } from "@/constants/keys";
import { Button } from "@/components/text-button";
import { Input } from "@/components/input";

const ForgotPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: [FORGOTPASSWORDKEY],
    mutationFn: AuthService.forgotPassword,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      setSubmitted(true);
    },
    onError: (error: ErrorResponse) => toast.error(error.message),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const forgotPasswordData = Object.fromEntries(formData.entries());

    const emailData = forgotPasswordData["email"] as string;

    setEmail(emailData);

    mutate(emailData);
  };

  return submitted ? (
    <div className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6">
      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="h-8 w-8 text-white" />
      </div>
      <p className="text-sm text-foreground/80 text-center lg:w-[386px] mx-auto">
        If an account exists for{" "}
        <span className="font-medium text-primary">{email}</span>, you will
        receive a password reset link shortly.
      </p>
    </div>
  ) : (
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
        disabled={isPending}
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

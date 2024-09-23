import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { RESET_PASSWORD_INPUTS } from "@/constants/collections";
import { AuthService } from "@/lib/services/auth-service";
import { RESETPASSWORDKEY } from "@/constants/keys";
import { Button } from "@/components/text-button";
import { AppRoutes } from "@/constants/routes";
import { ResetDTO } from "@/lib/DTO/reset-dto";
import { Input } from "@/components/input";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: [RESETPASSWORDKEY],
    mutationFn: AuthService.resetPassword,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      navigate(AppRoutes.SignIn);
    },
    onError: (error: ErrorResponse) => toast.error(error.message),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;

    const formData = new FormData(e.currentTarget);

    const resetPasswordData = Object.fromEntries(
      formData.entries()
    ) as ResetDTO;

    resetPasswordData.token = token;

    mutate(resetPasswordData);
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

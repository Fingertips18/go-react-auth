import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { RESET_PASSWORD_INPUTS } from "@/constants/collections";
import { AuthService } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useUserStore } from "@/lib/stores/user-store";
import { CHANGEPASSWORD } from "@/constants/keys";
import { Button } from "@/components/text-button";
import { ChangeDTO } from "@/lib/DTO/change-dto";
import { AppRoutes } from "@/constants/routes";
import { Input } from "@/components/input";

const ChangePasswordForm = () => {
  const { setLoading: setGlobalLoading } = useAuthStore();
  const { user } = useUserStore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [CHANGEPASSWORD],
    mutationFn: AuthService.changePassword,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      setGlobalLoading(false);
      navigate(AppRoutes.Root);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
      setGlobalLoading(false);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.email_address) {
      toast.error("No email address was provided");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const changePasswordData = Object.fromEntries(
      formData.entries()
    ) as ChangeDTO;

    changePasswordData.email = user.email_address;

    setGlobalLoading(true);

    mutate(changePasswordData);
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
            if (r.name === "newPassword") {
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
        label="Change"
        disabled={isPending}
        loading={isPending}
        type="submit"
      />
    </form>
  );
};

export { ChangePasswordForm };

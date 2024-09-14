import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/auth-store";
import { RESENDVERIFYKEY } from "@/constants/keys";

const ResendCode = () => {
  const { email } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationKey: [RESENDVERIFYKEY],
    mutationFn: AuthService.resendVerify,
    onSuccess: (res: GenericResponse) => toast.success(res.message),
    onError: (error: ErrorResponse) => toast.error(error.message),
  });

  const onClick = () => mutate(email);

  return (
    <div className="flex-center gap-x-2 text-sm">
      <p className="font-medium">Didn't receive a code?</p>
      <button
        className="font-bold underline-offset-4 hover:underline text-secondary transition-all hover:drop-shadow-secondary-glow"
        type="button"
        onClick={onClick}
        disabled={isPending}
      >
        Resend
      </button>
    </div>
  );
};

export { ResendCode };

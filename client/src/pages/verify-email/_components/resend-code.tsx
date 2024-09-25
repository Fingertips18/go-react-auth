import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/auth-store";
import { RESENDVERIFYKEY } from "@/constants/keys";

const ResendCode = () => {
  const {
    email,
    loading: globalLoading,
    setLoading: setGlobalLoading,
  } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationKey: [RESENDVERIFYKEY],
    mutationFn: AuthService.resendVerify,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      setGlobalLoading(false);
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message);
      setGlobalLoading(false);
    },
  });

  const onClick = () => {
    setGlobalLoading(true);
    mutate(email);
  };

  const loading = isPending || globalLoading;

  return (
    <div
      className="p-4 w-full text-sm lg:text-base rounded-md border 
        border-secondary/50 bg-secondary/15 drop-shadow-2xl flex-center gap-x-2"
    >
      <p className="font-medium">Didn't receive a code?</p>
      <button
        className="font-bold underline-offset-4 hover:underline text-secondary transition-all hover:drop-shadow-secondary-glow
          disabled:text-secondary/50 disabled:pointer-events-none"
        type="button"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? "Resending..." : "Resend"}
      </button>
    </div>
  );
};

export { ResendCode };

import { useMutation } from "@tanstack/react-query";
import { DoorOpen } from "lucide-react";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { useUserStore } from "@/lib/stores/user-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import IconButton from "@/components/icon-button";
import { SIGNOUTKEY } from "@/constants/keys";
import { Hint } from "@/components/hint";

const SignOutButton = () => {
  const { setAuthorized } = useAuthStore();
  const { setUser } = useUserStore();

  const { mutate, isPending } = useMutation({
    mutationKey: [SIGNOUTKEY],
    mutationFn: AuthService.signOut,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      setUser(undefined);
      setAuthorized(false);
    },
    onError: ({ message }) => toast.error(message),
  });

  return (
    <>
      <a data-tooltip-id="sign-out">
        <IconButton onClick={mutate} icon={DoorOpen} loading={isPending} />
      </a>

      <Hint id="sign-out" content="Sign out" isAccent />
    </>
  );
};

export { SignOutButton };

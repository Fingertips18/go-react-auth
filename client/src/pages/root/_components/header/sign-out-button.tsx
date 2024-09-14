import { useMutation } from "@tanstack/react-query";
import { DoorOpen } from "lucide-react";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { useAuthStore } from "@/lib/stores/auth-store";
import IconButton from "@/components/icon-button";
import { SIGNOUTKEY } from "@/constants/keys";

const SignOutButton = () => {
  const { setAuthorized } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationKey: [SIGNOUTKEY],
    mutationFn: AuthService.signOut,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      setAuthorized(false);
    },
    onError: ({ message }) => toast.error(message),
  });

  return <IconButton onClick={mutate} icon={DoorOpen} loading={isPending} />;
};

export { SignOutButton };

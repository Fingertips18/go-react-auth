import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DoorOpen } from "lucide-react";
import { toast } from "sonner";

import { AuthService } from "@/lib/services/auth-service";
import IconButton from "@/components/icon-button";
import { AppRoutes } from "@/constants/routes";
import { SIGNOUTKEY } from "@/constants/keys";

const SignOutButton = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [SIGNOUTKEY],
    mutationFn: AuthService.signOut,
    onSuccess: () => {
      toast.success("Signed out successfully");
      navigate(AppRoutes.SignIn);
    },
    onError: ({ message }) => toast.error(message || "Unable to sign out"),
  });

  return <IconButton onClick={mutate} icon={DoorOpen} loading={isPending} />;
};

export { SignOutButton };

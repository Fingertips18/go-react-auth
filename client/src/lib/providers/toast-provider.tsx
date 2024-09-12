import { Toaster } from "sonner";

import { useTheme } from "@/lib/hooks/use-theme";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { theme } = useTheme();

  return (
    <>
      <Toaster richColors position="top-center" theme={theme} />
      {children}
    </>
  );
};

export default ToastProvider;

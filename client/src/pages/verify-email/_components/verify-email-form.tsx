import { FormEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { GenericResponse } from "@/lib/classes/generic-response-class";
import { ErrorResponse } from "@/lib/classes/error-response-class";
import { AuthService } from "@/lib/services/auth-service";
import { Button } from "@/components/text-button";
import { VERIFYEMAILKEY } from "@/constants/keys";
import { AppRoutes } from "@/constants/routes";

import { SingleInput } from "./single-input";

const VerifyEmailForm = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: [VERIFYEMAILKEY],
    mutationFn: AuthService.verifyEmail,
    onSuccess: (res: GenericResponse) => {
      toast.success(res.message);
      navigate(AppRoutes.SignIn);
    },
    onError: (error: ErrorResponse) => toast.error(error.message),
  });

  const onChange = (value: string, index: number) => {
    if (index === 3 && value.length > 1) return;

    value = value.replace(/\D/g, "");

    let newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 4).split("");
      newCode = pastedCode;
      console.log(newCode);
      setCode(newCode);

      const lastFilledIndex = newCode
        .slice()
        .reverse()
        .findIndex((digit) => digit != "");
      const adjustedIndex =
        lastFilledIndex >= 0 ? newCode.length - 1 - lastFilledIndex : -1;
      const focusIndex = adjustedIndex < 3 ? adjustedIndex + 1 : 3;
      inputRef.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const verificationCode = code.join("");

    mutate(verificationCode);
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      const event = new Event("submit", { bubbles: true });
      formRef.current?.dispatchEvent(event);
    }
  }, [code]);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="p-4 lg:p-6 w-full md:w-fit rounded-md border border-primary/50 bg-primary/15 drop-shadow-2xl space-y-4 lg:space-y-6"
    >
      <div className="flex-center gap-x-4 lg:gap-x-6">
        {code.map((digit, i) => (
          <SingleInput
            key={`code-${i}`}
            name={`code-${i}`}
            iref={(el) => {
              if (el) {
                return (inputRef.current[i] = el);
              }
            }}
            digit={digit}
            onChange={(e) => onChange(e.target.value, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            disabled={isPending}
          />
        ))}
      </div>
      <Button
        label="Verify Email"
        type="submit"
        disabled={isPending}
        loading={isPending}
      />
    </form>
  );
};

export { VerifyEmailForm };

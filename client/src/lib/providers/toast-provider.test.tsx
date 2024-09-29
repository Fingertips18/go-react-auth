import { describe, it, expect, vi, beforeAll, Mock } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "sonner";

import { useTheme } from "@/lib/hooks/use-theme";

import ToastProvider from "./toast-provider";

vi.mock("../hooks/use-theme.tsx", () => ({
  useTheme: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
  Toaster: () => null,
}));

const SuccessMockComponent = () => {
  toast.success("Success!");
  return null;
};

const ErrorMockComponent = () => {
  toast.error("Error!");
  return null;
};

const InfoMockComponent = () => {
  toast.info("Info!");
  return null;
};

const WarningMockComponent = () => {
  toast.warning("Warning!");
  return null;
};

describe("Toast Provider", () => {
  beforeAll(() => {
    (useTheme as Mock).mockReturnValue({ theme: "light" });
  });

  it("should render without issues", () => {
    const label = "Hello world!";

    const { getByText } = render(
      <ToastProvider>
        <p>{label}</p>
      </ToastProvider>
    );

    expect(getByText(label)).toBeInTheDocument();
  });

  it("should render a success toast", () => {
    render(
      <ToastProvider>
        <SuccessMockComponent />
      </ToastProvider>
    );

    expect(toast.success).toHaveBeenCalledWith("Success!");
  });

  it("should render a error toast", () => {
    render(
      <ToastProvider>
        <ErrorMockComponent />
      </ToastProvider>
    );

    expect(toast.error).toHaveBeenCalledWith("Error!");
  });

  it("should render a info toast", () => {
    render(
      <ToastProvider>
        <InfoMockComponent />
      </ToastProvider>
    );

    expect(toast.info).toHaveBeenCalledWith("Info!");
  });

  it("should render a warning toast", () => {
    render(
      <ToastProvider>
        <WarningMockComponent />
      </ToastProvider>
    );

    expect(toast.warning).toHaveBeenCalledWith("Warning!");
  });
});

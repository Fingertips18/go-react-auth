import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeAll } from "vitest";

import { ThemeProvider } from "@/lib/providers/theme-provider";

import { Theme, useTheme } from "./use-theme";

describe("useTheme", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  it("should return default system theme", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe(Theme.System);
  });

  it("should return light theme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    act(() => {
      result.current.setTheme(Theme.Light);
    });

    expect(result.current.theme).toBe(Theme.Light);
  });

  it("should return dark theme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    act(() => {
      result.current.setTheme(Theme.Dark);
    });

    expect(result.current.theme).toBe(Theme.Dark);
  });
});

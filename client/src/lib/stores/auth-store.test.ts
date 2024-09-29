import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useAuthStore } from "./auth-store";

const auth = {
  email: "test@example.com",
  authorized: true,
  loading: true,
};

describe("authStore", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should have initial state", () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.email).toBe("");
    expect(result.current.authorized).toBeFalsy();
    expect(result.current.loading).toBeFalsy();
  });

  it("should set email correctly", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setEmail(auth.email);
    });

    expect(result.current.email).toEqual(auth.email);
  });

  it("should set authorized correctly", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAuthorized(true);
    });

    expect(result.current.authorized).toEqual(auth.authorized);
  });

  it("should set loading correctly", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toEqual(auth.loading);
  });

  it("should persist data in session storage", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setEmail(auth.email);
      result.current.setAuthorized(true);
      result.current.setLoading(true);
    });

    const storedData = sessionStorage.getItem("go-react-auth");
    expect(storedData).toBeTruthy();
  });

  it("should persist email and authorized only and it should be the same", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setEmail(auth.email);
      result.current.setAuthorized(true);
      result.current.setLoading(true);
    });

    const storedData = sessionStorage.getItem("go-react-auth");
    const parsedData = storedData ? JSON.parse(storedData) : "";
    const email = parsedData.state.email;
    const authorized = parsedData.state.authorized;
    const loading = parsedData.state.loading;

    expect(email).toEqual(auth.email);
    expect(authorized).toEqual(auth.authorized);
    expect(loading).toBeUndefined();
  });

  it("should reset", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setEmail(auth.email);
      result.current.setAuthorized(true);
      result.current.setLoading(true);
    });

    expect(result.current.email).toEqual(auth.email);
    expect(result.current.authorized).toBeTruthy();
    expect(result.current.loading).toBeTruthy();

    act(() => {
      result.current.setEmail("");
      result.current.setAuthorized(false);
      result.current.setLoading(false);
    });

    expect(result.current.email).toEqual("");
    expect(result.current.authorized).toBeFalsy();
    expect(result.current.loading).toBeFalsy();
  });
});

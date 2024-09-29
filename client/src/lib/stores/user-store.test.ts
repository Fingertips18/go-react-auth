import { beforeEach, describe, expect, it, test } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { UserDTO } from "@/lib/DTO/user-dto";

import { useUserStore } from "./user-store";

const user: UserDTO = {
  id: "abc123",
  username: "Test",
  email_address: "test@example.com",
  last_signed_in: new Date(),
  is_verified: false,
  created_at: new Date(),
};

describe("userStore", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should have initial state", () => {
    const { result } = renderHook(() => useUserStore());
    expect(result.current.user).toBeUndefined();
  });

  it("should set user correctly", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setUser(user);
    });

    expect(result.current.user).toEqual(user);
  });

  it("should persist user in session storage", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setUser(user);
    });

    const storedData = sessionStorage.getItem("go-react-user");
    expect(storedData).toBeTruthy();
  });

  test("stored user should be the same", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setUser(user);
    });

    const storedData = sessionStorage.getItem("go-react-user");
    const parseData = storedData ? JSON.parse(storedData) : "";
    const storedUser = parseData.state.user;

    const parsedUser = {
      ...storedUser,
      last_signed_in: new Date(storedUser.last_signed_in),
      created_at: new Date(storedUser.created_at),
    };

    expect(parsedUser).toEqual(user);
  });

  it("should reset", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setUser(user);
    });

    expect(result.current.user).toEqual(user);

    act(() => {
      result.current.setUser(undefined);
    });

    expect(result.current.user).toBeUndefined();
  });
});

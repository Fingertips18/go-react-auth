import { describe, it, expect, vi, Mock } from "vitest";

import { SignInDTO } from "@/lib/DTO/sign-in-dto";
import { UserDTO } from "@/lib/DTO/user-dto";

import { AuthService } from "./auth-service";

global.fetch = vi.fn();

const params: SignInDTO = {
  email: "test@example.com",
  password: "Password_123",
};

const user: UserDTO = {
  id: "abc123",
  username: "Test",
  email_address: "test@example.com",
  last_signed_in: new Date(),
  is_verified: false,
  created_at: new Date(),
};

describe("signIn", () => {
  it("should return a GenericResponse on successful sign-in", async () => {
    const message = "Sign in success";

    const mockResponse = { message, user };
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.signIn(params);
    expect(res.message).toEqual("Sign in success");
    expect(res.user).toEqual(user);
  });

  it("should throw an ErrorResponse on failed sign-in", async () => {
    const error = "Sign in failed";
    const mockResponse = { error };
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await expect(AuthService.signIn(params)).rejects.toThrow(
      expect.objectContaining({ status: 400, message: error })
    );
  });

  it("should have response status 200", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    const res = await AuthService.signIn(params);
    expect(res.response.status).toEqual(200);
  });

  it("should have content-type", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signIn(params);
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("should have JSON stringified in body", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signIn(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify(params),
      })
    );
  });

  it("should have called with POST method", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signIn(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("should include credentials", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signIn(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        credentials: "include",
      })
    );
  });
});

import { describe, it, expect, vi, Mock } from "vitest";

import { SignUpDTO } from "@/lib/DTO/sign-up-dto";

import { AuthService } from "./auth-service";

global.fetch = vi.fn();

const params: SignUpDTO = {
  username: "Test",
  email: "test@example.com",
  password: "Password_123",
};

describe("signUp", () => {
  it("should return a GenericResponse on successful sign-up", async () => {
    const message = "Sign up success";
    const mockResponse = { message };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.signUp(params);
    expect(res.message).toEqual(message);
  });

  it("should throw an ErrorResponse on failed sign-up", async () => {
    const error = "Sign up failed";
    const mockResponse = { error };

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await expect(AuthService.signUp(params)).rejects.toThrow(
      expect.objectContaining({ status: 400, message: error })
    );
  });

  it("should have response status 200", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    const res = await AuthService.signUp(params);
    expect(res.response.status).toEqual(200);
  });

  it("should have content-type", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signUp(params);
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
      status: 200,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signUp(params);

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
      status: 200,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signUp(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});

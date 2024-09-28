import { describe, it, expect, vi, Mock } from "vitest";

import { ResetDTO } from "@/lib/DTO/reset-dto";

import { AuthService } from "./auth-service";
import { AppRoutes } from "@/constants/routes";

global.fetch = vi.fn();

const params: ResetDTO = {
  old_password: "Old_Password123",
  new_password: "New_Password123",
  token: "token",
};

describe("resetPassword", () => {
  it("should return a GenericResponse on successful reset-password", async () => {
    const message = "Reset password success";
    const mockResponse = { message };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.resetPassword(params);
    expect(res.message).toEqual(message);
  });

  it("should throw an ErrorResponse on failed reset-password", async () => {
    const error = "Reset password failed";
    const mockResponse = { error };

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await expect(AuthService.resetPassword(params)).rejects.toThrow(
      expect.objectContaining({ status: 400, message: error })
    );
  });

  it("should have content-type", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.resetPassword(params);
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

    await AuthService.resetPassword(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({
          old_password: params.old_password,
          new_password: params.new_password,
        }),
      })
    );
  });

  it("should fetch with URL including the token", async () => {
    const baseURL =
      import.meta.env.VITE_ENV === "development"
        ? `${import.meta.env.VITE_BASE_URL}/api/auth`
        : "/api/auth";

    const expectedURL = `${baseURL}${AppRoutes.ResetPassword}/${params.token}`;

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.resetPassword(params);

    expect(fetch).toHaveBeenCalledWith(expectedURL, expect.any(Object));
  });

  it("should have called with POST method", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.resetPassword(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});

import { describe, it, expect, vi, Mock } from "vitest";

import { AuthService } from "./auth-service";

global.fetch = vi.fn();

describe("verifyToken", () => {
  it("should return a GenericResponse on successful verify-token", async () => {
    const message = "Verify token success";
    const mockResponse = { message };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.verifyToken();
    expect(res.message).toEqual(message);
  });

  it("should throw an ErrorResponse on failed verify-token", async () => {
    const error = "Verify token failed";
    const mockResponse = { error };

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await expect(AuthService.verifyToken()).rejects.toThrow(
      expect.objectContaining({ status: 400, message: error })
    );
  });

  it("should have called with GET method", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.verifyToken();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("should include credentials", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.verifyToken();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        credentials: "include",
      })
    );
  });
});

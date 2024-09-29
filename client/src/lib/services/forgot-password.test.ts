import { describe, it, expect, vi, Mock } from "vitest";

import { AuthService } from "./auth-service";

global.fetch = vi.fn();

const email = "test@example.com";

describe("forgotPassword", () => {
  it("should return a GenericResponse on successful forgot-password", async () => {
    const message = "Forgot password success";
    const mockResponse = { message };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.forgotPassword(email);
    expect(res.message).toEqual(message);
  });

  it("should throw an ErrorResponse on failed forgot-password", async () => {
    const error = "Forgot password failed";
    const mockResponse = { error };

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await expect(AuthService.forgotPassword(email)).rejects.toThrow(
      expect.objectContaining({ status: 400, message: error })
    );
  });

  it("should have content-type", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.forgotPassword(email);
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

    await AuthService.forgotPassword(email);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({
          email: email,
        }),
      })
    );
  });

  it("should have called with POST method", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.forgotPassword(email);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});

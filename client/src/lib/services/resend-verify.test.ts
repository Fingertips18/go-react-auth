import { describe, it, expect, vi, Mock } from "vitest";

import { AuthService } from "./auth-service";

global.fetch = vi.fn();

const email = "test@example.com";

describe("resendVerify", () => {
  it("should return a GenericResponse on successful resend-verify", async () => {
    const message = "Resend verify success";
    const mockResponse = { message };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.resendVerify(email);
    expect(res.message).toEqual(message);
  });

  it("should throw an ErrorResponse on failed resend-verify", async () => {
    const error = "Resend verify failed";
    const mockResponse = { error };

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await expect(AuthService.resendVerify(email)).rejects.toThrow(
      expect.objectContaining({ status: 400, message: error })
    );
  });

  it("should have content-type", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.resendVerify(email);
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

    await AuthService.resendVerify(email);

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

    await AuthService.resendVerify(email);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});

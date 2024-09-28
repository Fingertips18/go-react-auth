import { describe, it, expect, vi, Mock } from "vitest";

import { AuthService } from "./auth-service";

global.fetch = vi.fn();

describe("signOut", () => {
  it("should return a GenericResponse on successful sign-out", async () => {
    const message = "Sign out success";
    const mockResponse = { message };
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.signOut();
    expect(res.message).toEqual(message);
  });

  it("should throw an ErrorResponse on failed sign-out", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await expect(AuthService.signOut()).rejects.toThrow("Unable to sign out");
  });

  it("should have response status 200", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    const res = await AuthService.signOut();
    expect(res.response.status).toEqual(200);
  });

  it("should have called with POST method", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.signOut();

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

    await AuthService.signOut();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        credentials: "include",
      })
    );
  });
});

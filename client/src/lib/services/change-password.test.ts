import { describe, it, expect, vi, Mock } from "vitest";

import { ChangeDTO } from "@/lib/DTO/change-dto";

import { AuthService } from "./auth-service";

global.fetch = vi.fn();

const params: ChangeDTO = {
  email: "test@example.com",
  old_password: "Old_Password123",
  new_password: "New_Password123",
};

describe("changePassword", () => {
  it("should return a GenericResponse on successful change-password", async () => {
    const message = "Change password success";
    const mockResponse = { message };

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const res = await AuthService.changePassword(params);
    expect(res.message).toEqual(message);
  });

  it("should throw an ErrorResponse on failed change-password", async () => {
    const error = "Change password failed";
    const mockResponse = { error };

    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    await expect(AuthService.changePassword(params)).rejects.toThrow(
      expect.objectContaining({ status: 400, message: error })
    );
  });

  it("should have content-type", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await AuthService.changePassword(params);
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

    await AuthService.changePassword(params);

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

    await AuthService.changePassword(params);

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});

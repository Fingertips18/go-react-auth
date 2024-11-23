import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";

import { useAuthStore } from "@/lib/stores/auth-store";
import { AppRoutes } from "@/constants/routes";
import AuthGuard from "./auth-guard";

// Mock the store
vi.mock("@/lib/stores/auth-store", () => ({
  useAuthStore: vi.fn(),
}));

// Helper to track the current route location
function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe("Auth Guard", () => {
  it("redirects to the root page when authorized", async () => {
    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: true,
    });

    render(
      <MemoryRouter initialEntries={[AppRoutes.SignIn]}>
        <Routes>
          <Route path={AppRoutes.Root} element={<div>Root</div>} />
          <Route element={<AuthGuard />}>
            <Route path={AppRoutes.SignIn} element={<div>Sign In</div>} />
          </Route>
        </Routes>
        <LocationDisplay /> {/* Track current location */}
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe(AppRoutes.Root);
    });
  });

  it("stays on /sign-in when not authorized", async () => {
    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: false,
    });

    render(
      <MemoryRouter initialEntries={[AppRoutes.SignIn]}>
        <Routes>
          <Route path={AppRoutes.Root} element={<div>Root</div>} />
          <Route element={<AuthGuard />}>
            <Route path={AppRoutes.SignIn} element={<div>Sign In</div>} />
          </Route>
        </Routes>
        <LocationDisplay /> {/* Track current location */}
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe(AppRoutes.SignIn);
    });
  });
});

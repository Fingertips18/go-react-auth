import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { describe, it, expect, vi, Mock } from "vitest";
import { render, waitFor } from "@testing-library/react";

import { useAuthStore } from "@/lib/stores/auth-store";
import { AppRoutes } from "@/constants/routes";

import AuthGuard from "./auth-guard";

vi.mock("../lib/stores/auth-store.ts", () => ({
  useAuthStore: vi.fn(),
}));

const routes: RouteObject[] = [
  {
    path: AppRoutes.Root,
    element: <div>Root</div>,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: AppRoutes.SignIn,
        element: <div>Sign In</div>,
      },
    ],
  },
];

describe("Auth Guard", () => {
  it("redirects to the root page when authorized", async () => {
    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: true,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.SignIn],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(AppRoutes.Root);
    });
  });

  it("renders the outlet when not authorized", async () => {
    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: false,
    });

    const router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.SignIn],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(AppRoutes.SignIn);
    });
  });
});

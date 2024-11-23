import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { describe, it, expect, vi, Mock, beforeAll } from "vitest";
import { render } from "@testing-library/react";

import { useAuthStore } from "@/lib/stores/auth-store";
import { AppRoutes } from "@/constants/routes";

import AuthGuard from "./auth-guard";

vi.mock("@/lib/stores/auth-store", () => ({
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
  let router: ReturnType<typeof createMemoryRouter>;

  beforeAll(() => {
    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: true,
    });

    router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.SignIn],
    });

    render(<RouterProvider router={router} />);
  });

  it("redirects to the root page when authorized", () => {
    expect(router.state.location.pathname).toBe(AppRoutes.Root);
  });

  it("renders the outlet when not authorized", () => {
    // Change the mock return value to simulate an unauthorized user
    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: false,
    });

    // Update the router state to reflect the new authorization state
    router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.SignIn],
    });

    render(<RouterProvider router={router} />);

    // Assert that the Sign In page is rendered
    expect(router.state.location.pathname).toBe(AppRoutes.SignIn);
  });
});

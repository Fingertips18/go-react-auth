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
    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: false,
    });

    render(<RouterProvider router={router} />);

    expect(router);
  });
});

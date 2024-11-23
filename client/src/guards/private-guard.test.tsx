import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { describe, it, expect, vi, Mock } from "vitest";
import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAuthStore } from "@/lib/stores/auth-store";
import { useUserStore } from "@/lib/stores/user-store";
import { AppRoutes } from "@/constants/routes";

import PrivateGuard from "./private-guard";

vi.mock("@/lib/stores/auth-store", () => ({
  useAuthStore: vi.fn().mockReturnValueOnce({
    authorized: false,
    setAuthorized: vi.fn(),
  }),
}));

vi.mock("@/lib/stores/user-store", () => ({
  useUserStore: vi.fn().mockReturnValueOnce({
    setUser: vi.fn(),
  }),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn().mockReturnValueOnce({
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {
      user: {
        id: "abc123",
        username: "Test",
        email_address: "test@example.com",
        last_signed_in: new Date(),
        is_verified: false,
        created_at: new Date(),
      },
    },
  }),
}));

const routes: RouteObject[] = [
  {
    path: AppRoutes.SignIn,
    element: <div>Sign In</div>,
  },
  {
    element: <PrivateGuard />,
    children: [
      {
        path: AppRoutes.Root,
        element: <div>Root</div>,
      },
    ],
  },
];

describe("Private Guard", () => {
  it("redirects to sign-in page when not authorized", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.Root],
    });

    render(<RouterProvider router={router} />);

    expect(router.state.location.pathname).toEqual(AppRoutes.SignIn);
  });

  it("redirects to sign in page when an error occurs", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.Root],
    });

    (useUserStore as unknown as Mock).mockRejectedValueOnce({
      setUser: vi.fn(),
    });

    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authenticated: true,
      setAuthorized: vi.fn(),
    });

    (useQuery as Mock).mockReturnValueOnce({
      isError: true,
      isLoading: false,
      isSuccess: false,
      data: {
        user: undefined,
      },
    });

    render(<RouterProvider router={router} />);

    expect(router.state.location.pathname).toEqual(AppRoutes.SignIn);
  });

  it("allows access to root page when authorized", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.Root],
    });

    (useUserStore as unknown as Mock).mockReturnValueOnce({
      setUser: vi.fn(),
    });

    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: true,
      setAuthorized: vi.fn(),
    });

    (useQuery as Mock).mockReturnValueOnce({
      isError: false,
      isLoading: false,
      isSuccess: true,
      data: {
        user: undefined,
      },
    });

    render(<RouterProvider router={router} />);

    expect(router.state.location.pathname).toEqual(AppRoutes.Root);
  });

  it("renders loading component when query is loading", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [AppRoutes.Root],
    });

    (useUserStore as unknown as Mock).mockRejectedValueOnce({
      useUser: vi.fn(),
    });

    (useAuthStore as unknown as Mock).mockReturnValueOnce({
      authorized: true,
      setAuthorized: vi.fn(),
    });

    (useQuery as Mock).mockReturnValueOnce({
      isError: false,
      isLoading: true,
      isSuccess: false,
    });

    const { container } = render(<RouterProvider router={router} />);

    const loader = container.querySelector("svg");

    expect(loader).toBeInTheDocument();
  });
});

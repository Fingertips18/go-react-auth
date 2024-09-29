import { describe, it, expect, vi, beforeAll } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ThemeProvider, ThemeProviderContext } from "./theme-provider";

describe("Theme Provider", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  it("should render without any issues", () => {
    const label = "Hello world!";

    const { getByText } = render(
      <ThemeProvider>
        <p>{label}</p>
      </ThemeProvider>
    );

    expect(getByText(label)).toBeInTheDocument();
  });

  it("sets the initial theme from localStorage", () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue("light"),
      setItem: vi.fn(),
    };

    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeProviderContext.Consumer>
          {({ theme }) => <p data-testid="theme">{theme}</p>}
        </ThemeProviderContext.Consumer>
      </ThemeProvider>
    );

    expect(getByTestId("theme")).toHaveTextContent("light");
  });

  it("applies the theme to the document root", () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue("dark"),
      setItem: vi.fn(),
    };

    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    render(
      <ThemeProvider>
        <p>Test</p>
      </ThemeProvider>
    );

    const root = window.document.documentElement;

    expect(root.classList.contains("dark")).toBeTruthy();
  });
});

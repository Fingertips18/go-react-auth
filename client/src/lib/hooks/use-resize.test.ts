import { describe, it, expect, beforeAll } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useResize } from "./use-resize";

describe("useResize", () => {
  const sm = 640;
  const md = 768;
  const lg = 1024;
  const xl = 1280;
  const xl2 = 1536;

  beforeAll(() => {
    window.innerWidth = 800;
    window.innerHeight = 600;
  });

  it("should initialize with the correct window size", () => {
    const { result } = renderHook(() => useResize());
    expect(result.current).toEqual({ width: 800, height: 600 });
  });

  it("should update size on window resize", () => {
    const { result } = renderHook(() => useResize());
    expect(result.current).toEqual({ width: 800, height: 600 });

    act(() => {
      window.innerWidth = 1024;
      window.innerHeight = 768;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("should be small screen", () => {
    const { result } = renderHook(() => useResize());

    act(() => {
      window.innerWidth = sm;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toEqual(sm);
  });

  it("should be medium screen", () => {
    const { result } = renderHook(() => useResize());

    act(() => {
      window.innerWidth = md;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toEqual(md);
  });

  it("should be large screen", () => {
    const { result } = renderHook(() => useResize());

    act(() => {
      window.innerWidth = lg;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toEqual(lg);
  });

  it("should be extra large screen", () => {
    const { result } = renderHook(() => useResize());

    act(() => {
      window.innerWidth = xl;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toEqual(xl);
  });

  it("should be 2x extra large screen", () => {
    const { result } = renderHook(() => useResize());

    act(() => {
      window.innerWidth = xl2;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toEqual(xl2);
  });
});

import { fireEvent, render, act } from "@testing-library/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

import QueryProvider from "./query-provider";

const DefaultMockComponent = () => {
  const { data } = useQuery({
    queryKey: ["testQuery"],
    queryFn: async () => await Promise.resolve("Fetched data"),
  });

  return <p>{data}</p>;
};

const SuccessMockComponent = () => {
  const { mutate } = useMutation({
    mutationKey: ["testQuery"],
    mutationFn: async () => await Promise.resolve("Success"),
    onSuccess: (data) => console.log(data),
  });

  return <button onClick={() => mutate()} />;
};

const ErrorMockComponent = () => {
  const { mutate } = useMutation({
    mutationKey: ["testQuery"],
    mutationFn: async () => await Promise.reject(new Error("Error")),
    onError: ({ message }) => console.log(message),
  });

  return <button onClick={() => mutate()} />;
};

describe("Query Provider", () => {
  it("renders without crashing", () => {
    const label = "Hello world!";

    const { getByText } = render(
      <QueryProvider>
        <p>{label}</p>
      </QueryProvider>
    );

    expect(getByText(label)).toBeInTheDocument();
  });

  it("should render fetched data", async () => {
    const { findByText } = render(
      <QueryProvider>
        <DefaultMockComponent />
      </QueryProvider>
    );

    expect(await findByText("Fetched data")).toBeInTheDocument();
  });

  it("should logs 'Success' on mutation call", async () => {
    const consoleLogSpy = vi.spyOn(console, "log");

    const { getByRole } = render(
      <QueryProvider>
        <SuccessMockComponent />
      </QueryProvider>
    );

    const button = getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(consoleLogSpy).toHaveBeenCalledWith("Success");
  });

  it("should logs 'Error' on mutation call", async () => {
    const consoleLogSpy = vi.spyOn(console, "log");

    const { getByRole } = render(
      <QueryProvider>
        <ErrorMockComponent />
      </QueryProvider>
    );

    const button = getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(consoleLogSpy).toHaveBeenCalledWith("Error");
  });
});

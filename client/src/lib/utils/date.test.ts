import { describe, it, expect } from "vitest";

import { formatDate } from "./date";

const format: Partial<Intl.DateTimeFormatOptions> = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

describe("formatDate", () => {
  it("should format a valid date string correctly", () => {
    const now = new Date();
    const result = formatDate(now.toISOString());
    expect(result).toBe(now.toLocaleDateString("en-US", format));
  });

  it('should return "Invalid Date" for an invalid date string', () => {
    const result = formatDate("test");
    expect(result).toBe("Invalid Date");
  });

  it("should handle empty string input", () => {
    const result = formatDate("");
    expect(result).toBe("Invalid Date");
  });
});

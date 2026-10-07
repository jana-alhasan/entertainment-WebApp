import {
  isBookMarked,
  normalizeSearchQuery,
  toHoursAndMinutes,
} from "./utils";

describe("normalizeSearchQuery", () => {
  test("trims, lowercases, and URL-encodes search text", () => {
    expect(normalizeSearchQuery("  Spider Man & Friends  ")).toBe(
      "spider%20man%20%26%20friends"
    );
  });

  test("returns an empty string for empty input", () => {
    expect(normalizeSearchQuery("   ")).toBe("");
  });
});

describe("isBookMarked", () => {
  test("returns true when the exact media id is present", () => {
    expect(isBookMarked(42, [{ id: 7 }, { id: 42 }])).toBe(true);
  });

  test("returns false when the media id is absent", () => {
    expect(isBookMarked(99, [{ id: 7 }, { id: 42 }])).toBe(false);
  });
});

describe("toHoursAndMinutes", () => {
  test("splits total minutes into hours and remaining minutes", () => {
    expect(toHoursAndMinutes(135)).toEqual({ hours: 2, minutes: 15 });
  });

  test("handles durations shorter than one hour", () => {
    expect(toHoursAndMinutes(45)).toEqual({ hours: 0, minutes: 45 });
  });
});

import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("exposes a named search input", () => {
    render(
      <SearchBar
        placeHolder="Search for movies"
        handleSearchInput={() => {}}
      />
    );

    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: "Search for movies" })
    ).toBeInTheDocument();
  });
});

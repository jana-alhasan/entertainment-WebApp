import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

import Card from "./Card";

const movie = {
  id: 1,
  title: "Dune",
  vote_average: 8.2,
};

function renderCard(overrides = {}) {
  const indicateBookedMarkedBtn = jest.fn();

  render(
    <Card
      element={movie}
      className="card"
      title="Dune"
      media_type="movie"
      release_date="2021-10-22"
      poster_path="/poster.jpg"
      isBookedMarked={false}
      indicateBookedMarkedBtn={indicateBookedMarkedBtn}
      to="/movies/1"
      id={1}
      {...overrides}
    />
  );

  return indicateBookedMarkedBtn;
}

describe("Card accessibility", () => {
  test("provides a named details link and bookmark control", () => {
    const indicateBookedMarkedBtn = renderCard();

    expect(
      screen.getByRole("link", { name: "View details for Dune" })
    ).toHaveAttribute("href", "/movies/1");

    const bookmarkButton = screen.getByRole("button", {
      name: "Add Dune to bookmarks",
    });

    expect(bookmarkButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(bookmarkButton);
    expect(indicateBookedMarkedBtn).toHaveBeenCalledWith(movie, "movie");
  });

  test("announces removal when the item is already bookmarked", () => {
    renderCard({ isBookedMarked: true });

    const bookmarkButton = screen.getByRole("button", {
      name: "Remove Dune from bookmarks",
    });

    expect(bookmarkButton).toHaveAttribute("aria-pressed", "true");
  });
});

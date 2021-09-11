import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Nav from "./Nav";

test("highlights active page", () => {
  render(
    <MemoryRouter initialEntries={["/claim"]}>
      <Nav />
    </MemoryRouter>
  );
  expect(screen.getByText(/Claim/i)).toHaveClass("bg-yellow-200");
});

test("does not highlight inactive page", () => {
  render(
    <MemoryRouter initialEntries={["/claim"]}>
      <Nav />
    </MemoryRouter>
  );
  expect(screen.getByText(/Swap/i)).not.toHaveClass("bg-yellow-200");
  expect(screen.getByText(/Swap/i)).toHaveClass("hover:text-yellow-700");
});

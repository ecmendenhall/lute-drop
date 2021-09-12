import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Routes from "./index";

test("home page", () => {
  render(<Routes />);
  expect(
    screen.getByText(/Loot and mLoot holders may claim one Lute or Flute/i)
  ).toBeInTheDocument();
});

test("navigating to swap page", () => {
  render(<Routes />);

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Swap/i), leftClick);
  expect(screen.getByAltText(/Swap Lutes for Flutes/i)).toBeInTheDocument();
});

test("navigating to about page", () => {
  render(<Routes />);

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Swap/i), leftClick);
  expect(screen.getByText(/About/i)).toBeInTheDocument();
});

test("navigating to home page", () => {
  render(<Routes />);

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Swap/i), leftClick);
  userEvent.click(screen.getByText(/Claim/i), leftClick);
  expect(
    screen.getByText(/Loot and mLoot holders may claim one Lute or Flute/i)
  ).toBeInTheDocument();
});

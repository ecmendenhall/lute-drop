import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const header = screen.getByText(/Lute Drop/i);
  expect(header).toBeInTheDocument();
});

test("renders connect button", () => {
  render(<App />);
  const claimLute = screen.getByText(/Connect/i);
  expect(claimLute).toBeInTheDocument();
});

test("renders nav links", () => {
  render(<App />);
  const claimLink = screen.getByText(/Claim$/);
  expect(claimLink).toBeInTheDocument();

  const swapLink = screen.getByText(/Swap$/);
  expect(swapLink).toBeInTheDocument();

  const aboutLink = screen.getByText(/About$/);
  expect(aboutLink).toBeInTheDocument();
});

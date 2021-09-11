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

test("renders claim lute button", () => {
  render(<App />);
  const claimLute = screen.getByText(/Claim a Lute/i);
  expect(claimLute).toBeInTheDocument();
});

test("renders claim flute button", () => {
  render(<App />);
  const claimLute = screen.getByText(/Claim a Flute/i);
  expect(claimLute).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FullPage from "./FullPage";

test("renders subhed", () => {
  render(
    <MemoryRouter>
      <FullPage subhed="Subhed text">Page content</FullPage>
    </MemoryRouter>
  );
  const subhed = screen.getByText(/Subhed text/i);
  expect(subhed).toBeInTheDocument();
});

test("renders children", () => {
  render(
    <MemoryRouter>
      <FullPage subhed="Subhed text">Page content</FullPage>
    </MemoryRouter>
  );
  const content = screen.getByText(/Page content/i);
  expect(content).toBeInTheDocument();
});

test("renders nav", () => {
  render(
    <MemoryRouter>
      <FullPage subhed="Subhed text">Page content</FullPage>
    </MemoryRouter>
  );
  const nav = screen.getByText(/Claim/i);
  expect(nav).toBeInTheDocument();
});

test("renders connect button", () => {
  render(
    <MemoryRouter>
      <FullPage subhed="Subhed text">Page content</FullPage>
    </MemoryRouter>
  );
  const connect = screen.getByText(/Connect/i);
  expect(connect).toBeInTheDocument();
});

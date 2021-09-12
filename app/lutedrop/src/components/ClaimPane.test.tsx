import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClaimPanel from "./ClaimPanel";

test("shows number claimed", () => {
  const onClaimSpy = jest.fn();
  render(
    <ClaimPanel
      enabled
      claimed={100}
      imgSrc="img/Item.png"
      imgAlt="Item"
      imgStyle="translate-x-4"
      color="green"
      buttonText="Claim Item"
      onClaim={onClaimSpy}
    />
  );
  const claimCount = screen.getByText(/100/i);
  expect(claimCount).toBeInTheDocument();
});

test("renders image", () => {
  const onClaimSpy = jest.fn();
  render(
    <ClaimPanel
      enabled
      claimed={100}
      imgSrc="img/Item.png"
      imgAlt="Item"
      imgStyle="translate-x-4"
      color="green"
      buttonText="Claim Item"
      onClaim={onClaimSpy}
    />
  );
  const image = screen.getByAltText("Item");
  expect(image).toBeInTheDocument();
  expect(image.getAttribute("src")).toBe("img/Item.png");
  expect(image).toHaveClass("translate-x-4");
});

test("renders button when enabled", () => {
  const onClaimSpy = jest.fn();
  render(
    <ClaimPanel
      enabled
      claimed={100}
      imgSrc="img/Item.png"
      imgAlt="Item"
      imgStyle="translate-x-4"
      color="green"
      buttonText="Claim Item"
      onClaim={onClaimSpy}
    />
  );
  const button = screen.getByText(/Claim Item/);
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("bg-green-300");
});

test("hides button when disabled", () => {
  const onClaimSpy = jest.fn();
  render(
    <ClaimPanel
      enabled={false}
      claimed={100}
      imgSrc="img/Item.png"
      imgAlt="Item"
      imgStyle="translate-x-4"
      color="green"
      buttonText="Claim Item"
      onClaim={onClaimSpy}
    />
  );
  const button = screen.queryByText(/Claim Item/);
  expect(button).not.toBeInTheDocument();
});

test("calls onClaim on button click", () => {
  const onClaimSpy = jest.fn();
  render(
    <ClaimPanel
      enabled
      claimed={100}
      imgSrc="img/Item.png"
      imgAlt="Item"
      imgStyle="translate-x-4"
      color="green"
      buttonText="Claim Item"
      onClaim={onClaimSpy}
    />
  );
  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Claim Item/i), leftClick);
  expect(onClaimSpy).toHaveBeenCalled();
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("button text", () => {
  render(<Button color="green">Click here</Button>);
  const button = screen.getByText(/Click here/i);
  expect(button).toBeInTheDocument();
});

test("button color", () => {
  render(<Button color="green">Click here</Button>);
  const button = screen.getByText(/Click here/i);
  expect(button).toHaveClass("bg-green-300");
  expect(button).toHaveClass("text-green-800");
});

test("button onClick", () => {
  const clickSpy = jest.fn();
  render(
    <Button color="green" onClick={clickSpy}>
      Click here
    </Button>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Click here/i), leftClick);
  expect(clickSpy).toHaveBeenCalled();
});

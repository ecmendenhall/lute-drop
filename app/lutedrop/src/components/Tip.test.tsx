import { fireEvent, render, screen } from "@testing-library/react";
import Tip from "./Tip";

test("sets default tip to $20 USD in ETH", () => {
  const onTipChangeSpy = jest.fn();
  render(
    <Tip defaultTip={"20.0"} etherPrice={"4000"} onTipChange={onTipChangeSpy} />
  );
  const usdPrice = screen.getByText("$20.00 USD");
  expect(usdPrice).toBeInTheDocument();
  const ethPrice = screen.getByAltText("Tip");
  expect(ethPrice.getAttribute("value")).toBe("0.005");
});

test("updates amounts on change", () => {
  const onTipChangeSpy = jest.fn();
  render(
    <Tip defaultTip={"20.0"} etherPrice={"3600"} onTipChange={onTipChangeSpy} />
  );

  const ethPrice = screen.getByAltText("Tip");
  fireEvent.change(ethPrice, { target: { value: "0.01" } });
  expect(ethPrice.getAttribute("value")).toBe("0.01");
});

test("calls onTipChange on change", () => {
  const onTipChangeSpy = jest.fn();
  render(
    <Tip defaultTip={"20.0"} etherPrice={"3600"} onTipChange={onTipChangeSpy} />
  );

  const ethPrice = screen.getByAltText("Tip");
  fireEvent.change(ethPrice, { target: { value: "0.01" } });
  expect(onTipChangeSpy).toHaveBeenCalledWith("0.01");
});

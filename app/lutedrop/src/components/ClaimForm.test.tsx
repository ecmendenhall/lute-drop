import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClaimForm from "./ClaimForm";

test("renders remaining supply", () => {
  const onSelectLootSpy = jest.fn();
  const onTipChangeSpy = jest.fn();
  render(
    <ClaimForm
      enabled
      remaining={10}
      total={100}
      holdings={[]}
      etherPrice={"4000"}
      onSelectLoot={onSelectLootSpy}
      onTipChange={onTipChangeSpy}
    />
  );
  const claimableHeader = screen.getByText(/Claimable:/);
  expect(claimableHeader).toBeInTheDocument();
  const remainingSupply = screen.getByText(/10 \/ 100/i);
  expect(remainingSupply).toBeInTheDocument();
});

test("renders select loot section", () => {
  const onSelectLootSpy = jest.fn();
  const onTipChangeSpy = jest.fn();
  render(
    <ClaimForm
      enabled
      remaining={10}
      total={100}
      holdings={[]}
      etherPrice={"4000"}
      onSelectLoot={onSelectLootSpy}
      onTipChange={onTipChangeSpy}
    />
  );
  const claimWithHeader = screen.getByText(/Claim with:/);
  expect(claimWithHeader).toBeInTheDocument();
});

test("hides select loot section when etherPrice is undefined", () => {
  const onSelectLootSpy = jest.fn();
  const onTipChangeSpy = jest.fn();
  render(
    <ClaimForm
      enabled
      remaining={10}
      total={100}
      holdings={[]}
      onSelectLoot={onSelectLootSpy}
      onTipChange={onTipChangeSpy}
    />
  );
  const claimWithHeader = screen.queryByText(/Claim with:/);
  expect(claimWithHeader).not.toBeInTheDocument();
});

test("renders tip section", () => {
  const onSelectLootSpy = jest.fn();
  const onTipChangeSpy = jest.fn();
  render(
    <ClaimForm
      enabled
      remaining={10}
      total={100}
      holdings={[]}
      etherPrice={"4000"}
      onSelectLoot={onSelectLootSpy}
      onTipChange={onTipChangeSpy}
    />
  );
  const tipHeader = screen.getByText(/Tip your luthier:/);
  expect(tipHeader).toBeInTheDocument();
});

test("hides tip section when etherPrice is undefined", () => {
  const onSelectLootSpy = jest.fn();
  const onTipChangeSpy = jest.fn();
  render(
    <ClaimForm
      enabled
      remaining={10}
      total={100}
      holdings={[]}
      onSelectLoot={onSelectLootSpy}
      onTipChange={onTipChangeSpy}
    />
  );
  const tipHeader = screen.queryByText(/Tip your luthier:/);
  expect(tipHeader).not.toBeInTheDocument();
});

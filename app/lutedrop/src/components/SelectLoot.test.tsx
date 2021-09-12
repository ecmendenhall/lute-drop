import { BigNumber } from "@ethersproject/bignumber";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectLoot from "./SelectLoot";

test("renders a dropdown item for each holding", () => {
  const onSelectSpy = jest.fn();
  render(
    <SelectLoot
      showTokenName
      onSelectLoot={onSelectSpy}
      holdings={[
        {
          name: "mLoot",
          holdings: [
            { id: BigNumber.from("1"), name: "Bag #1" },
            { id: BigNumber.from("2"), name: "Bag #2" },
          ],
        },
        {
          name: "Loot",
          holdings: [{ id: BigNumber.from("1"), name: "Bag #1" }],
        },
      ]}
    />
  );
  const mlootBag1Option = screen.getByText(/mLoot Bag #1/);
  expect(mlootBag1Option).toBeInTheDocument();
  const mlootBag2Option = screen.getByText(/mLoot Bag #2/);
  expect(mlootBag2Option).toBeInTheDocument();
  const lootBag1Option = screen.getByText(/^Loot Bag #1/);
  expect(lootBag1Option).toBeInTheDocument();
});

test("hides token name", () => {
  const onSelectSpy = jest.fn();
  render(
    <SelectLoot
      showTokenName={false}
      onSelectLoot={onSelectSpy}
      holdings={[
        {
          name: "mLoot",
          holdings: [
            { id: BigNumber.from("1"), name: "Bag #1" },
            { id: BigNumber.from("2"), name: "Bag #2" },
          ],
        },
      ]}
    />
  );
  const mlootBag1Option = screen.getByText(/^Bag #1/);
  expect(mlootBag1Option).toBeInTheDocument();
  const mlootBag2Option = screen.getByText(/^Bag #2/);
  expect(mlootBag2Option).toBeInTheDocument();
});

test("calls onSelectLoot with item index on change", () => {
  const onSelectSpy = jest.fn();
  render(
    <SelectLoot
      showTokenName
      onSelectLoot={onSelectSpy}
      holdings={[
        {
          name: "mLoot",
          holdings: [
            { id: BigNumber.from("1"), name: "Bag #1" },
            { id: BigNumber.from("2"), name: "Bag #2" },
          ],
        },
        {
          name: "Loot",
          holdings: [{ id: BigNumber.from("1"), name: "Bag #1" }],
        },
      ]}
    />
  );
  userEvent.selectOptions(screen.getByRole("combobox"), "0,1");
  expect(onSelectSpy).toHaveBeenCalledWith(0, 1);
});

test("initial item with one holding", () => {
  const onSelectSpy = jest.fn();
  render(
    <SelectLoot
      showTokenName
      onSelectLoot={onSelectSpy}
      holdings={[
        {
          name: "mLoot",
          holdings: [],
        },
        {
          name: "Loot",
          holdings: [{ id: BigNumber.from("1"), name: "Bag #1" }],
        },
      ]}
    />
  );
  expect(onSelectSpy).toHaveBeenCalledWith(1, 0);
});

test("initial item with two holdings", () => {
  const onSelectSpy = jest.fn();
  render(
    <SelectLoot
      showTokenName
      onSelectLoot={onSelectSpy}
      holdings={[
        {
          name: "mLoot",
          holdings: [
            { id: BigNumber.from("1"), name: "Bag #1" },
            { id: BigNumber.from("2"), name: "Bag #2" },
          ],
        },
        {
          name: "Loot",
          holdings: [{ id: BigNumber.from("1"), name: "Bag #1" }],
        },
      ]}
    />
  );
  expect(onSelectSpy).toHaveBeenCalledWith(0, 0);
});

test("initial item with no holdings", () => {
  const onSelectSpy = jest.fn();
  render(
    <SelectLoot
      showTokenName
      onSelectLoot={onSelectSpy}
      holdings={[
        {
          name: "mLoot",
          holdings: [],
        },
        {
          name: "Loot",
          holdings: [],
        },
      ]}
    />
  );
  expect(onSelectSpy).not.toHaveBeenCalled();
});

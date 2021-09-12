import { render, screen } from "@testing-library/react";
import { TransactionStatus as TxStatus } from "@usedapp/core";
import TransactionStatus from "./TransactionStatus";

test("mining message", () => {
  const txState = {
    status: "Mining",
  } as TxStatus;
  render(
    <TransactionStatus
      txState={txState}
      miningMessage="Mining"
      successMessage="Success"
    />
  );
  const miningMessage = screen.getByText(/Mining/i);
  expect(miningMessage).toBeInTheDocument();
});

test("success message", () => {
  const txState = {
    status: "Success",
  } as TxStatus;
  render(
    <TransactionStatus
      txState={txState}
      miningMessage="Mining"
      successMessage="Success"
    />
  );
  const successMessage = screen.getByText(/Success/i);
  expect(successMessage).toBeInTheDocument();
});

test("exception message", () => {
  const txState = {
    status: "Exception",
    errorMessage: "Oops!",
  } as TxStatus;
  render(
    <TransactionStatus
      txState={txState}
      miningMessage="Mining"
      successMessage="Success"
    />
  );
  const errorMessage = screen.getByText(/Oops!/i);
  expect(errorMessage).toBeInTheDocument();
});

test("failure message", () => {
  const txState = {
    status: "Fail",
    errorMessage: "Oops!",
  } as TxStatus;
  render(
    <TransactionStatus
      txState={txState}
      miningMessage="Mining"
      successMessage="Success"
    />
  );
  const errorMessage = screen.getByText(/Oops!/i);
  expect(errorMessage).toBeInTheDocument();
});

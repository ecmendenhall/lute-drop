import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEthers, shortenAddress, Web3Ethers } from "@usedapp/core";
import Connect from "./Connect";

jest.mock("@usedapp/core");

const mockUseEthers = useEthers as jest.Mock<Web3Ethers>;
const mockShortenAddress = shortenAddress as jest.Mock;

test("shows 'Connect' when not connected", () => {
  mockUseEthers.mockReturnValue({
    activateBrowserWallet: jest.fn(),
    active: false,
    activate: jest.fn(),
    deactivate: jest.fn(),
    setError: jest.fn(),
    account: undefined,
  });
  render(<Connect />);
  const button = screen.getByText(/Connect/i);
  expect(button).toBeInTheDocument();
});

test("connects on click", async () => {
  const activateBrowserWallet = jest.fn();
  mockUseEthers.mockReturnValue({
    activateBrowserWallet: activateBrowserWallet,
    active: true,
    activate: jest.fn(),
    deactivate: jest.fn(),
    setError: jest.fn(),
    account: undefined,
  });
  render(<Connect />);
  const button = await screen.findByText(/Connect/);

  const leftClick = { button: 0 };
  userEvent.click(button, leftClick);
  expect(activateBrowserWallet).toHaveBeenCalled();
});

test("shows abbreviated address when connected", async () => {
  mockUseEthers.mockReturnValue({
    activateBrowserWallet: jest.fn(),
    active: true,
    activate: jest.fn(),
    deactivate: jest.fn(),
    setError: jest.fn(),
    account: "0x79d31bFcA5Fda7A4F15b36763d2e44C99D811a6C",
  });
  mockShortenAddress.mockReturnValue("0x79d3…1a6c");
  render(<Connect />);
  const button = await screen.findByText(/0x79d3…1a6c/);
  expect(button).toBeInTheDocument();
});

import { ethers } from "ethers";
import { UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

const NETWORK_URL =
  process.env.REACT_APP_NETWORK_URL ||
  "https://mainnet.infura.io/v3/372087f51aa84597983fbcb06d8aba96";

export const NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ?? "1");

if (typeof NETWORK_URL === "undefined") {
  throw new Error(
    `REACT_APP_NETWORK_URL must be a defined environment variable`
  );
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
});

export const metamask = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 31337],
});

export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    return "An unknown error occurred. Check the console for more details.";
  }
}

export function getLibrary(provider) {
  const prd = window.web3.currentProvider;
  return new ethers.providers.Web3Provider(prd);
}

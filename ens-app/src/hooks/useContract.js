import { useMemo } from "react";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../utils";
import { getLibrary } from "../connectors";
import { SafeAppsSdkProvider } from "@gnosis.pm/safe-apps-ethers-provider";
import { SafeAppsSdkSigner } from "@gnosis.pm/safe-apps-ethers-provider";
/**
 * @name useContract
 * @param {*} address
 * @param {*} ABI
 * @param {*} withSignerIfPossible
 */
export function useContract(address, ABI, withSignerIfPossible = false) {
  const { account, library } = useWeb3React();
  const { sdk, safe } = useSafeAppsSDK();
  new SafeAppsSdkProvider(safe, sdk);
  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        new SafeAppsSdkSigner(safe, sdk),
        // library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account, safe]);
}

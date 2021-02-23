import { useContract } from "./useContract";
import ENSRegistrarController_ABI from "../contracts/ETHRegistrarController_ABI.json";

import contracts from "../constants";
export function useContractENS() {
  return useContract(
    contracts.ensRegistryContoller,
    ENSRegistrarController_ABI,
    false
  );
}

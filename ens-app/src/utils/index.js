import { ethers } from "ethers";

/**
 * @name getContract
 * @param {*} address
 * @param {*} ABI
 * @param {*} library
 * @param {*} account
 */
export function getContract(address, ABI, library, account) {
  const contract = new ethers.Contract(
    address,
    ABI,
    getProviderOrSigner(library, account)
  );
  return contract;
}

/**
 * @name getContractFactory
 * @param {*} address
 * @param {*} ABI
 * @param {*} account
 */
export function getContractFactory(ABI, BYTECODE, library, account) {
  if (!BYTECODE || !ABI) {
    throw Error(`Invalid ABI or Bytecide.`);
  }
  try {
    const contract = new ethers.ContractFactory(
      ABI,
      BYTECODE,
      getProviderOrSigner(library, account)
    );
    return contract;
  } catch (error) {
    console.log(error, "errrrr");
  }
}

export function getSigner(library, account) {
  const signer = library.getSigner(account);
  return signer;
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

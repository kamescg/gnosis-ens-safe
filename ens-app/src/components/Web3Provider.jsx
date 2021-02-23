import React, { useEffect } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { getLibrary, injected } from "../connectors";

/**
 * @name Web3Provider
 * @param {Object} props
 */
export const Web3Provider = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Bootup>{children}</Web3Bootup>
    </Web3ReactProvider>
  );
};

export default Web3Provider;

const Web3Bootup = (props) => {
  const { activate } = useWeb3React();

  useEffect(() => {
    activate(injected);
  }, []);

  return props.children;
};

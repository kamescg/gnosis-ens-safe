import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Header } from './layout'
import { Web3Provider, ENSActions } from './components'

const Container = styled.div`
font-family: Averta;
  margin-bottom: 2rem;
  width: 100%;
  // max-width: 480px;

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;



const App: React.FC = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const [submitting, setSubmitting] = useState(false);

  const submitTx = useCallback(async () => {
    setSubmitting(true);
    try {
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: safe.safeAddress,
            value: '0',
            data: '0x',
          },
        ],
      });
      // console.log({ safeTxHash });
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      // console.log({ safeTx });
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  }, [safe, sdk]);

  return (
    <Web3Provider>
      <Container>
        <Header/>
        <ENSActions/>
      </Container>
    </Web3Provider>
  );
};

export default App;

import * as React from 'react'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Button, Loader, Title } from '@gnosis.pm/safe-react-components';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  border-bottom: 1px dashed #ccc;
  display: flex;
  padding-bottom: 10px;
  width: 100%;
  max-width: 100%;
  .left {
    flex: 3;
  }
  .right {
    display: flex;
    flex: 2;
    flex-direction: column;
    justify-content: flex-end;
    justify-items: flex-end;
    align-items: flex-end;

    h4 {
      font-size: 0.9rem;
      margin-bottom: 4px;
    }
  }

  h2 {
    margin-bottom: 6px;
    line-height: auto;
  }
`;



/**
 * @name Header
 * @param {Object} props
 */
export const Header: React.FunctionComponent = () => { 

  const { sdk, safe } = useSafeAppsSDK();

 return(
  <HeaderContainer className='header'>
    <div className='left'>
      <h2>Ethereum Name System</h2>
      <span>Decentralized naming for wallets, websites, &amp; more...</span>
    </div>
    <div className='right'>
      <h4>{safe.safeAddress}</h4>
      <a href="https://ens.domains/" target="_blank">Application</a>
    </div>
  </HeaderContainer>
)}

export default Header;
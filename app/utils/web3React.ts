import { InjectedConnector } from '@web3-react/injected-connector'
import Web3 from 'web3'

import Metamask from '@/assets/icon/wallet/Metamask';
import TrustWallet from '@/assets/icon/wallet/TrustWallet';

export enum ConnectorNames {
  Injected = "injected"
}

const chainId = parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`, 10)

export const injected = new InjectedConnector({ supportedChainIds: [chainId] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected
}

export const getLibrary = (provider: any): Web3 => {
  return provider
}

export const connectors = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'TrustWallet',
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
  }
];

export const connectorLocalStorageKey = "connectorId";

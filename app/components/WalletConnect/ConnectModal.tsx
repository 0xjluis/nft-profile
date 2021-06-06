import React from 'react';

import { Modal } from '@pancakeswap-libs/uikit';
import WalletCard from './WalletCard';
import { connectors } from '@/utils/web3React';
import { Login } from './types';

interface Props {
  login: Login;
  onDismiss?: () => void;
}

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => (
  <Modal title="Connect to a wallet" onDismiss={onDismiss}>
    {connectors.map((entry, index) => (
      <WalletCard
        key={entry.title}
        login={login}
        walletConfig={entry}
        onDismiss={onDismiss}
        mb={index < connectors.length - 1 ? "8px" : "0"}
      />
    ))}
  </Modal>
);

export default ConnectModal;

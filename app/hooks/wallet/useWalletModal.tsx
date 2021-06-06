import React from 'react';

import { useModal } from '@pancakeswap-libs/uikit';
import ConnectModal from '@/components/WalletConnect/ConnectModal';
import { Login } from '@/components/WalletConnect/types'

interface ReturnType {
  onPresentConnectModal: () => void;
}

const useWalletModal = (login: Login): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} />);

  return { onPresentConnectModal };
};

export default useWalletModal;

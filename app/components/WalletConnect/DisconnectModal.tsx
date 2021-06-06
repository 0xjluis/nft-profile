import React from 'react';
import { Modal } from '@pancakeswap-libs/uikit';

import { Flex, Button } from '@/components'
import { Logout } from './types';

interface Props {
  logout: Logout;
  onDismiss?: () => void;
}


const DisconnectModal: React.FC<Props> = ({ logout, onDismiss = () => null }) => (
  <Modal title="Do you want to disonnect wallet?" onDismiss={onDismiss}>
    <Flex
      flexDirection='column'
      alignItems='center'>
      <Button
        mb='15px'
        maxWidth='250px'
        onClick={async () => {
          logout()
          onDismiss()
        }}>
        Disconnect
        </Button>
      <Button
        bg='warning'
        maxWidth='250px'
        onClick={onDismiss}>
        Cancel
        </Button>
    </Flex>
  </Modal>
);

export default DisconnectModal;

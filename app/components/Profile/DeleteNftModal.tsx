import React from 'react';
import { Modal } from '@pancakeswap-libs/uikit';

import { Flex, Button, Text } from '@/components'

interface Props {
  nftIndex: number;
  deleteNft: (index: number) => void;
  onDismiss?: () => void;
}

const DeleteNftModal: React.FC<Props> = ({ nftIndex, deleteNft, onDismiss = () => null }) => {

  return (
    <Modal title="Do you want to delete this NFT from your wallet!?" onDismiss={onDismiss}>
      <Text color='failure' fontSize='14px' mb='15px'>
        Warning: If you delete NFT from your wallet, it will be permanently removed.
      </Text>
      <Flex
        flexDirection='column'
        alignItems='center'>
        <Button
          bg='failure'
          mb='15px'
          maxWidth='250px'
          onClick={() => {
            deleteNft(nftIndex)
            onDismiss()
          }}>
          Delete
          </Button>
        <Button
          bg='warning'
          maxWidth='250px'
          onClick={onDismiss}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  )
};

export default DeleteNftModal;

import React from 'react';
import { Modal } from '@pancakeswap-libs/uikit';

import { Flex, Button } from '@/components'

interface Props {
  nftIndex: number;
  deleteNft: (index: number) => void;
  onDismiss?: () => void;
}

const DeleteNftModal: React.FC<Props> = ({ nftIndex, deleteNft, onDismiss = () => null }) => {

  return (
    <Modal title="Do you want to delete this NFT from your wallet!?" onDismiss={onDismiss}>
      <Flex
        flexDirection='column'
        alignItems='center'>
        <Button
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

import React from 'react'
import styled from 'styled-components'

import { Button, Heading, Card } from '@/components'
import useConnect from '@/hooks/wallet/useConnect'
import useWalletModal from '@/hooks/wallet/useWalletModal'

const WalletConnectCard = styled(Card)`
  background: ${({ theme }) => theme.card.backgroundGrey};
  padding: 30px 20px;
  heigth: 100%;
  text-align: center;

  > div {
    display: inline-block;
    margin-top: 10px;
  }
`

const WalletConnect = () => {
  const { login } = useConnect()
  const { onPresentConnectModal } = useWalletModal(login)

  return (
    <WalletConnectCard>
      <Heading scale="lg" mb="8px">
        Please connect your wallet to continue
      </Heading>
      <div>
        <Button
          bg="primary"
          maxWidth="200px"
          onClick={onPresentConnectModal}>
          Connect Wallet
        </Button>
      </div>
    </WalletConnectCard>
  )
}

export default WalletConnect

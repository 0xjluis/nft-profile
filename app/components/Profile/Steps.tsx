import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { CardBody } from '@pancakeswap-libs/uikit'

import WalletConnect from '@/components/WalletConnect'
import { ProfileContext } from '@/contexts/Profile/ProfileContext'
import { Card, Heading, Text, Button } from '@/components'
import Mint from './Mint'
import ChooseProfile from './ChooseProfile'

const Steps = () => {
  const { isInitialized, currentStep, actions } = useContext(ProfileContext)
  const { account } = useWeb3React()

  if (!account) {
    return <WalletConnect />
  }

  if (!isInitialized) {
    return <div>Loading...</div>
  }
  console.log('currentStep', currentStep)
  if (currentStep === 0) {
    return <Mint />
  }

  if (currentStep === 1) {
    return <ChooseProfile />
  }

  if (currentStep > 1) {
    return (
      <Card
        mt='20px'
        textAlign='center'>
        <CardBody>
          <Heading scale="lg" mb="8px">
            Congrats profile picture already set.
          </Heading>
          <Text as="p" mb="24px" color="textSubtle">
            Or if you want to change profile picture, Just click the button on below.
          </Text>
          <Button
            onClick={() => actions.setStep(1)}>
            Change profile pic
          </Button>
        </CardBody>
      </Card>
    )
  }

  return null
}

export default Steps

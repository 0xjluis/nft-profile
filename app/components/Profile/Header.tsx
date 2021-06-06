import React, { useEffect, useState, useContext } from 'react'
import Image, { ImageProps } from 'next/image'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useModal } from '@pancakeswap-libs/uikit';

import NoProfileAvatar from '@/assets/icon/NoProfileAvatar'
import { Text, Heading, Flex, Button, Breadcrumbs } from '@/components'
import DisconnectModal from '@/components/WalletConnect/DisconnectModal'
import useConnect from '@/hooks/wallet/useConnect'
import { ProfileContext } from '@/contexts/Profile/ProfileContext'
import Nfts from '@/config/constants/nfts'

const AvatarWrapper = styled.div`
  text-align: center;
`
const Avatar = styled.div`
  display: inline-block;
  height: 200px;
  width: 200px;
  margin-bottom: 8px;
  position: relative;
`

const ProfileAvatar = styled(Image) <ImageProps>`
  border-radius: 50%;
`

const steps = ['Get Starter Collectible', 'Set Profile Picture']

const Header: React.FC = () => {
  const { account } = useWeb3React()
  const { logout } = useConnect()
  const { currentStep } = useContext(ProfileContext)
  const [onPresentLogoutModal] = useModal(<DisconnectModal logout={logout} />);
  const [values, setValues] = useState({
    profileImage: '',
    isProfileSet: false
  });


  useEffect(() => {
    const profile = JSON.parse(window?.localStorage.getItem('profile') || '{}')
    const profileImage = Nfts.find(o => `${o.id}` === `${profile[account as any]?.id}`)?.image || ''
    const isProfileSet = !!(account && profileImage)

    setValues({ profileImage, isProfileSet })
  }, [account, currentStep])

  return (
    <>
      <Flex
        justifyContent='space-between'
        alignItems='center'>
        <Heading as="h1" scale="xl">
          Profile Setup
        </Heading>
        {account &&
          <Button
            maxWidth='250px'
            onClick={onPresentLogoutModal}>
            Disconnect wallet
          </Button>
        }
      </Flex>
      <AvatarWrapper>
        {values.isProfileSet
          ?
          <Avatar>
            <ProfileAvatar layout='fill' src={`/image/${values.profileImage}`} />
          </Avatar>
          :
          <Avatar>
            <NoProfileAvatar />
          </Avatar>
        }
      </AvatarWrapper>
      <Text textAlign='center' mt='15px'>
        Account: {account ? account : 'Not connect'}
      </Text>
      { currentStep <= 1 &&
        <Breadcrumbs>
          {steps.map((text, index) => {
            return (
              <Text key={text} color={index <= currentStep ? 'text' : 'textDisabled'}>
                {text}
              </Text>
            )
          })}
        </Breadcrumbs>
      }
    </>
  )
}

export default Header

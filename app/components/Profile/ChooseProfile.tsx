import React, { useState, useContext, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { CardBody, RemoveIcon, useModal, AutoRenewIcon } from '@pancakeswap-libs/uikit'

import { Heading, Text, Button, Flex, Card } from '@/components'
import useGetCollectibles, { useDeleteCollectibles } from '@/hooks/useCollectibles'
import { ProfileContext } from '@/contexts/Profile/ProfileContext'
import SelectionCard from './SelectionCard'
import DeleteNftModal from './DeleteNftModal'

const ChooseProfile = () => {
  const [nftData, setNftData] = useState({} as any)
  const [nftIndex, setNftIndex] = useState(0)
  const isNftIdEmpty = isNaN(nftData?.id as any) || (nftData?.id === '')
  const { account } = useWeb3React()
  const { actions } = useContext(ProfileContext)
  const { nftData: nfts, fetchNftData } = useGetCollectibles()
  const { deleteNft, isDeleting, isDeleted } = useDeleteCollectibles()
  const [onPresentModal] = useModal(<DeleteNftModal deleteNft={deleteNft} nftIndex={nftIndex} />);

  const setProfilePic = (nftData: any, account: any) => {
    window.localStorage.setItem('profile', JSON.stringify({ [account]: nftData }))
    actions.nextStep()
  }

  useEffect(() => {
    if (isDeleted) {
      fetchNftData()
    }
  }, [isDeleted])


  useEffect(() => {
    if (nfts.length === 0 && isDeleted) {
      actions.setStep(0)
    }
  }, [nfts])


  return (
    <Card mb="24px">
      <CardBody>
        <Heading as="h4" scale="lg" my="8px">
          Setup your profile
      </Heading>
        {nfts.map((nft: any, index: number) => {
          const handleChange = (value: string) => {
            const data = nfts.find((nft: any) => nft.id === Number(value))
            setNftData(data)
          }

          return (
            <SelectionCard
              key={nft.id}
              value={nft.id}
              image={`/image/${nft.image}`}
              name="mintStarter"
              isChecked={nftData?.id === nft.id}
              disabled={isDeleting}
              onChange={handleChange}>
              <Flex
                justifyContent='space-between'
                alignItems='center'>
                <Text bold>{nft.name}</Text>
                {isDeleting
                  ?
                  <AutoRenewIcon spin color="currentColor" width='30px' />
                  :
                  <RemoveIcon
                    color='failure'
                    width='30px'
                    onClick={() => {
                      setNftIndex(index)
                      onPresentModal()
                    }}
                  />
                }
              </Flex>
            </SelectionCard>
          )
        })}
        <Button
          disabled={isNftIdEmpty || isDeleting}
          onClick={() => { setProfilePic(nftData, account) }}>
          Confirm
        </Button>
      </CardBody>
    </Card>
  )
}

export default ChooseProfile

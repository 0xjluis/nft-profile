import React, { useState, useMemo, useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { CardBody } from '@pancakeswap-libs/uikit'

import { Heading, Text, Card } from '@/components'
import ApproveConfirmButtons from '@/components/Profile/ApproveConfirmButtons'
import { MINT_COST, DEFAULT_TOKEN_DECIMAL } from '@/config'
import { tokens } from '@/config/constants/addresses'
import { getCarrotContract } from '@/utils/contractHelpers'
import { getProfileContract } from '@/utils/contractHelpers'
import nfts from '@/config/constants/nfts'
import { useHasTokenBalance } from '@/hooks/useTokenBalance'
import useApproveConfirmTransaction from '@/hooks/useApproveConfirmTransaction'
import useWeb3 from '@/hooks/useWeb3'
import { ProfileContext } from '@/contexts/Profile/ProfileContext'
import SelectionCard from './SelectionCard'

const minimumTokenBalanceToMint = new BigNumber(MINT_COST).multipliedBy(DEFAULT_TOKEN_DECIMAL)

const Mint: React.FC = () => {
  const [nftId, setNftId] = useState<number | string>('' as any)
  const isNftIdEmpty = isNaN(nftId as any) || (nftId === '')
  const hasMinimumTokenRequired = useHasTokenBalance(minimumTokenBalanceToMint as any)
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const carrotContract = useMemo(() => getCarrotContract(web3), [web3])
  const profileContract = useMemo(() => getProfileContract(web3), [web3])

  const { actions, minimumTokenRequired, allowance } = useContext(ProfileContext)

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await carrotContract.methods.allowance(account, profileContract.options.address).call()
          const currentAllowance = new BigNumber(response)
          return currentAllowance.gte(minimumTokenRequired)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return carrotContract.methods
          .approve(profileContract.options.address, allowance.toJSON())
          .send({ from: account })
      },
      onConfirm: () => {
        return profileContract.methods.carrotMint(nftId).send({ from: account })
      },
      onSuccess: () => actions.nextStep(),
    })

  return (
    <>
      <Card mb="24px">
        <CardBody>
          <Heading as="h4" scale="lg" my="8px">
            Choose your NFT!
        </Heading>
          <Text as="p" mb="24px" color="textSubtle">
            Cost: 1 ${tokens.carrot.symbol}
          </Text>
          {nfts.map((nft) => {
            const handleChange = (value: string) => setNftId(Number(value))

            return (
              <SelectionCard
                key={nft.id}
                value={nft.id}
                image={`/image/${nft.image}`}
                name="mintStarter"
                isChecked={nftId === nft.id}
                disabled={isApproving || isConfirming || isConfirmed || !hasMinimumTokenRequired}
                onChange={handleChange}>
                <Text bold>{nft.name}</Text>
              </SelectionCard>
            )
          })}
          {!hasMinimumTokenRequired && (
            <Text color="failure" mb="16px">
              {`A minimum of ${MINT_COST} CARROT is required`}
            </Text>
          )}
          <ApproveConfirmButtons
            isApproveDisabled={isNftIdEmpty || isConfirmed || isConfirming || isApproved}
            isApproving={isApproving}
            isConfirmDisabled={isNftIdEmpty || !isApproved || isConfirmed || !hasMinimumTokenRequired}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
          />
        </CardBody>
      </Card>
    </>
  )
}

export default Mint

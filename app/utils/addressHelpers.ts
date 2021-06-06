import { tokens, addresses } from '@/config/constants/addresses'
import { Address } from '@/config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId: number = +(`${process.env.NEXT_PUBLIC_CHAIN_ID}`)
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getCarrotAddress = () => {
  return getAddress(tokens.carrot.address)
}

export const getProfileAddress = () => {
  return getAddress(addresses.profile)
}

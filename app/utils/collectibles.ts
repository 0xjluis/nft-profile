import { IPFS_GATEWAY } from '@/config/constants/nfts'
import { getProfileContract } from './contractHelpers'

export const getTokenUrl = (tokenUri: string) => {
  if (tokenUri.startsWith('ipfs://')) {
    return `${IPFS_GATEWAY}/ipfs/${tokenUri.slice(6)}`
  }

  return tokenUri
}

export const getTokenUriData = async (tokenId: number) => {
  try {
    const profileContract = getProfileContract()
    const tokenUri = await profileContract.methods.tokenURI(tokenId).call()
    const uriDataResponse = await fetch(getTokenUrl(tokenUri))

    if (!uriDataResponse.ok) {
      return null
    }

    const uriData = await uriDataResponse.json()
    return uriData
  } catch (error) {
    console.error('getTokenUriData', error)
    return null
  }
}

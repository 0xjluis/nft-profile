import { useEffect, useMemo, useState, useCallback, useReducer } from 'react'
import { useWeb3React } from '@web3-react/core'

import Nfts from '@/config/constants/nfts'
import { getProfileContract } from '@/utils/contractHelpers'
import useWeb3 from '@/hooks/useWeb3'

interface TokenUriAndIdResponse {
  tokenURI: string
  tokenId: string
}

const getTokenUriAndId = async (
  profileContract: any,
  account: any,
  index: number
): Promise<TokenUriAndIdResponse> => {
  try {
    const tokenId = await profileContract.methods.tokenOfOwnerByIndex(account, index).call()
    const tokenURI = await profileContract.methods.tokenURI(tokenId).call()

    return { tokenURI, tokenId }
  } catch (error) {
    return { tokenURI: '', tokenId: '' }
  }
}

const initialState = {
  initialized: false,
  deleteState: ''
}

const reducer = (state: any, actions: any): any => {
  switch (actions.type) {
    case 'initialize':
      return {
        ...state,
        initialized: true,
      }
    case 'delete_sending':
      return {
        ...state,
        deleteState: 'loading',
      }
    case 'delete_receipt':
      return {
        ...state,
        deleteState: 'success',
      }
    case 'delete_error':
      return {
        ...state,
        deleteState: 'fail',
      }
    default:
      return state
  }
}

const useGetCollectibles = () => {
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [nftData, setNftData] = useState([] as any)

  const web3 = useWeb3()
  const profileContract = useMemo(() => getProfileContract(web3), [web3])

  const fetchNftData = useCallback(async () => {
    const nftDataFetchPromises = []
    const balanceOfResponse = await profileContract.methods.balanceOf(account).call()
    const balanceOf = Number(balanceOfResponse)
    // For each index get the tokenId and data associated with it
    for (let i = 0; i < balanceOf; i++) {
      nftDataFetchPromises.push(getTokenUriAndId(profileContract, account, i))
    }
    const response = await Promise.all(nftDataFetchPromises)
    // const nftDataMap = Nfts.filter(nft => response.map(obj => obj.tokenURI === nft.tokenURI))
    const nftDataMap = response.reduce((acc, cur) => {
      const data = Nfts.find(nft => nft.tokenURI === cur?.tokenURI);
      acc = [
        ...acc,
        {
          ...cur,
          ...data
        }
      ] as any

      return acc
    }, [])

    setNftData(nftDataMap)
  }, [])

  useEffect(() => {
    if (!state.initialize) {
      fetchNftData()
      dispatch({ type: 'initialize' })
    }
  }, [state.initialize]);

  return { nftData, fetchNftData }
}

export const useDeleteCollectibles = () => {
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [initialized, setInitialized] = useState(false)
  const web3 = useWeb3()
  const profileContract = useMemo(() => getProfileContract(web3), [web3])

  const deleteNft = useCallback((nftIndex) => {
    dispatch({ type: 'delete_sending' })
    const burnNft = async () => {
      try {
        const { tokenId } = await getTokenUriAndId(profileContract, account, nftIndex)
        await profileContract.methods.burn(tokenId).send({ from: account })

        dispatch({ type: 'delete_receipt' })
      } catch (e) {
        console.log(e)
      }
    }

    if (!state.initialize) {
      burnNft()
      dispatch({ type: 'initialize' })
    }
  }, [state.initialized])

  return {
    deleteNft,
    isDeleting: state.deleteState === 'loading',
    isDeleted: state.deleteState === 'success',
  }
}

export default useGetCollectibles

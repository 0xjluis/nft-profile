import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import { DEFAULT_TOKEN_DECIMAL, MINT_COST, REGISTER_COST, ALLOWANCE_MULTIPLIER } from '@/config'
import { getProfileContract } from '@/utils/contractHelpers'

import {
  ProfileState as State,
  ProfileContextType as ContextType
} from './types'
import { Action } from '../types'

const totalCost = MINT_COST + REGISTER_COST
const allowance = totalCost * ALLOWANCE_MULTIPLIER

const initialState: State = {
  isInitialized: false,
  currentStep: 0,
  selectedNft: {
    nftAddress: null as any,
    tokenId: null as any,
  },
  userName: '',
  allowance: new BigNumber(allowance).multipliedBy(DEFAULT_TOKEN_DECIMAL),
  minimumTokenRequired: new BigNumber(totalCost).multipliedBy(DEFAULT_TOKEN_DECIMAL),
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'initialize':
      return {
        ...state,
        isInitialized: true,
        currentStep: action.payload.step,
      }
    case 'next_step':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      }
    case 'set_step':
      return {
        ...state,
        currentStep: action.payload.step,
      }
    case 'set_selected_nft':
      return {
        ...state,
        selectedNft: {
          tokenId: action.payload.tokenId,
          nftAddress: action.payload.nftAddress,
        },
      }
    case 'set_username':
      return {
        ...state,
        userName: action.payload.userName,
      }
    default:
      return state
  }
}

const ProfileContext = createContext<ContextType>(null as any)

const ProfileProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWeb3React()

  useEffect(() => {
    const fetchData = async () => {
      const profileContract = getProfileContract()
      const balanceOfResponse = await profileContract.methods.balanceOf(account).call()

      const step = () => {
        if (balanceOfResponse > 0) {
          const profile = JSON.parse(window.localStorage.getItem('profile') || '{}')
          if (profile[account as any]?.id) {
            return 2
          }
          return 1
        }
        return 0
      }
      const payload = { step: step() }

      dispatch({ type: 'initialize', payload })
    }

    if (account) {
      fetchData()
    }
  }, [account, dispatch])

  const actions = useMemo(
    () => ({
      nextStep: () => dispatch({ type: 'next_step' }),
      setStep: (step: number) => dispatch({ type: 'set_step', payload: { step } }),
      setSelectedNft: (tokenId: number, nftAddress: string) => {
        const payload = { tokenId, nftAddress }
        return dispatch({ type: 'set_selected_nft', payload })
      },
      setUserName: (userName: string) => {
        const payload = { userName }
        dispatch({ type: 'set_username', payload })
      }
    }),
    [dispatch],
  )

  return <ProfileContext.Provider value={{ ...state, actions }}>{children}</ProfileContext.Provider>
}

export { ProfileProvider, ProfileContext }

import BigNumber from 'bignumber.js'
import { Action } from '../types'

// export interface ProfileActionPayload extends Action {
//   step: number
//   tokenId: number
//   nftAddress: string
//   userName: string
// }

export interface ProfileState {
  isInitialized: boolean
  currentStep: number
  selectedNft: {
    tokenId: number
    nftAddress: string
  }
  userName: string
  allowance: BigNumber
  minimumTokenRequired: BigNumber
}

export interface ProfileContextType extends ProfileState {
  actions: {
    nextStep: () => void
    setStep: (step: number) => void
    setSelectedNft: (tokenId: number, nftAddress: string) => void
    setUserName: (userName: string) => void
  }
}


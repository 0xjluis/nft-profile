import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from '@/utils/web3'

// Addresses
import {
  getCarrotAddress,
  getProfileAddress
} from 'app/utils/addressHelpers'

// ABI
import carrotAbi from 'app/config/abi/carrot.json'
import nftProfileAbi from 'app/config/abi/nftProfile.json'
import bep20Abi from 'app/config/abi/erc20.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}

export const getCarrotContract = (web3?: Web3) => {
  return getContract(carrotAbi, getCarrotAddress(), web3)
}

export const getProfileContract = (web3?: Web3) => {
  return getContract(nftProfileAbi, getProfileAddress(), web3)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}

import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'

import { getCarrotAddress } from '@/utils/addressHelpers'
import { getBep20Contract } from '@/utils/contractHelpers'
import useWeb3 from './useWeb3'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: new BigNumber(0),
    fetchStatus: NOT_FETCHED,
  })
  const web3 = useWeb3()
  const { account } = useWeb3React()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3)
      try {
        const res = await contract.methods.balanceOf(account).call()
        setBalanceState({ balance: new BigNumber(res), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, web3, SUCCESS, FAILED])

  return balanceState
}

export const useHasTokenBalance = (minimumBalance: BigNumber) => {
  const { balance } = useTokenBalance(getCarrotAddress())
  return balance.gte(minimumBalance)
}


export default useTokenBalance

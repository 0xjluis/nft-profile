import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BIG_TEN = new BigNumber(10)
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const MINT_COST = 2
export const REGISTER_COST = 1
export const ALLOWANCE_MULTIPLIER = 5
export const BASE_BSC_SCAN_URL = 'https://testnet.bscscan.com'


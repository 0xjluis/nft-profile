// // Set of helper functions to facilitate wallet setup

import { BASE_BSC_SCAN_URL } from '@/config'

// /**
//  * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
//  * @returns {boolean} true if the setup succeeded, false otherwise
//  */
export const setupNetwork = async () => {
  const provider = (window as WindowChain).ethereum
  if (provider) {
    const chainId = parseInt(`${process.env.NEXT_PUBLIC_CHAIN_ID}`, 10)
    try {
      await (provider as any).request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18,
            },
            rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
            blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

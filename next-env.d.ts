/// <reference types="next" />
/// <reference types="next/types/global" />

interface WindowChain {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => void
  }
}

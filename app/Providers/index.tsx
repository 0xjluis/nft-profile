import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { ModalProvider } from '@pancakeswap-libs/uikit';

import { getLibrary } from '@/utils/web3React'
import ThemeProvider from './ThemeProvider'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  )
}

export default Providers

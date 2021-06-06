import React from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'

const ThemeProvider = ({ children }: any) => {
  return (
    <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
  )
}

export default ThemeProvider

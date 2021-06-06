import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Baloo 2', 'Kanit', sans-serif;
  }
  body {
    background: ${({ theme }) => (theme as any).colors.background};
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle

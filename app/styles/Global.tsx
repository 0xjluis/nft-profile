import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap');

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

import styled from 'styled-components'

import Profile from '@/components/Profile'

import GlobalStyle from '@/styles/Global'
import useEagerConnect from '@/hooks/wallet/useEagerConnect'

const AppWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Footer = styled.div<{ src: string }>`
  background-image: url('${({ src }) => src}');
  background-position: center bottom;
  background-repeat: repeat-x;
  padding-bottom: 17%;
  background-size: 50%;
`

export default function Home() {
  useEagerConnect()

  return (
    <>
      <AppWrapper>
        <GlobalStyle />
        <Profile />
      </AppWrapper>
      <Footer src='/image/footerbg.svg' />
    </>
  )
}

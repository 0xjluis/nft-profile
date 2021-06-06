import type { AppProps } from 'next/app'

import Provider from '@/Providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp

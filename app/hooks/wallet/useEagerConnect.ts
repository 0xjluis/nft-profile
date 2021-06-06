import { useEffect } from 'react'

import { connectorLocalStorageKey, ConnectorNames } from '@/utils/web3React'
import useConnect from '@/hooks/wallet/useConnect'

const useEagerConnect = () => {
  const { login } = useConnect()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames
    const isContinueLogin = window.localStorage.getItem('login');

    if (connectorId && isContinueLogin) {
      login()
    }
  }, [login])
}

export default useEagerConnect

import { useEffect } from 'react'
import { dispatchEvent } from '../code/utils'
import { usePrevious } from './usePrevious'

export function useMoralisEventsForward(Moralis, authState, notifier) {
  const {
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
    isAuthenticated,
    isAuthenticating,
    hasAuthError,
  } = authState

  const prevAuthState = usePrevious(authState)

  useEffect(() => {
    if (!prevAuthState) return
    const isLodingNow = isAuthenticating || isWeb3EnableLoading
    const wasAlreadyEnabled = prevAuthState.isAuthenticated && prevAuthState.isWeb3Enabled
    if (wasAlreadyEnabled || isLodingNow) return

    const wasInLoadingStatePrev =
      // !prevAuthState.isAuthenticated ||
      prevAuthState.isAuthenticating ||
      // !prevAuthState.isWeb3Enabled ||
      prevAuthState.isWeb3EnableLoading
    // !prevAuthState.account
    const isReady = isAuthenticated && isWeb3Enabled && account

    if (isReady && wasInLoadingStatePrev) {
      console.log('onWalletAuthenticated', account)
      dispatchEvent('onWalletAuthenticated', account)
      notifier.info(`Wallet authenticated: ${account}`)
    } else if (!isReady && wasInLoadingStatePrev) {
      dispatchEvent('onWalletAuthenticationFailed')
      // notifier.warning(`Wallet authentication failed`)
    }
  }, [isAuthenticated, isAuthenticating, notifier, account])
  useEffect(() => {
    const unSubList = []
    unSubList.push(
      Moralis.onWeb3Enabled((result) => {
        const { account, chainId, connector, web3, provider } = result
        console.log('onWeb3Enabled', result)
        dispatchEvent('onWeb3Enabled', result)
        notifier.info(`Wallet connected: ${account}`)
      })
    )
    unSubList.push(
      Moralis.onWeb3Deactivated((result) => {
        console.log('onWeb3Deactivated', result)
        dispatchEvent('onWeb3Deactivated', result)
        notifier.info(`Wallet disconnected`)
      })
    )
    unSubList.push(
      Moralis.onAccountChanged(function (account) {
        console.log('onAccountsChanged', account)
        if (!account) {
          // account can be null
          dispatchEvent('onWeb3Deactivated', result)
          notifier.info(`Wallet disconnected`)
        } else {
          dispatchEvent('onAccountChanged', account)
          // notifier.info(`Account changed to: ${account}`)
        }
      })
    )
    unSubList.push(
      Moralis.onChainChanged(function (chainId) {
        console.log('onChainChanged', chainId)
        dispatchEvent('onChainChanged', chainId)
        // notifier.info(`Chain changed to: ${chainId}`)
      })
    )
    return () => {
      unSubList.forEach((unSub) => {
        unSub && unSub()
      })
    }
  }, [Moralis])
  // function bindOnEvent(bindFunction) {
  //   const unsubscribe = bindFunction((...args) => cb && cb.apply(null, args))
  //   return unsubscribe
  // }
  // const bindOnWeb3Enabled = useCallback(bindOnEvent(Moralis.onWeb3Enabled), [Moralis])
  // const bindOnWeb3Deactivated = useCallback(bindOnEvent(Moralis.onWeb3Deactivated), [Moralis])
  // const bindOnAccountChanged = useCallback(bindOnEvent(Moralis.onAccountChanged), [Moralis])
  // const bindOnChainChanged = useCallback(bindOnEvent(Moralis.onChainChanged), [Moralis])
  // return { bindOnWeb3Enabled, bindOnWeb3Deactivated, bindOnAccountChanged, bindOnChainChanged }
  // useEffect(() => {
  //   if (web3EnableError) {
  //     console.log('web3EnableError', web3EnableError)
  //    dispatchEvent('web3EnableError'), web3EnableError)
  //     notifier.warning(`web3EnableError: ${web3EnableError}`)
  //   }
  // }, [web3EnableError])
}

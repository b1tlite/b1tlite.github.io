import React, { useState, useCallback, useEffect } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import { PaperCheckout } from '@paperxyz/react-client-sdk'

import { useFunctionBinding } from '../hooks/useFunctionBinding'
import { useMoralisEventsForward } from '../hooks/useMoralisEventsForward'
import { useNotifier } from '../hooks/useNotifier'

import { WalletModal } from './WalletModal'
import { getTWSdk, getTWMarketplace, getTWNFTDrop, getTWEdition } from '../code/thirdWebUtils'
import { initialize as initializeForMintProject } from '../projects/mintProject'
import { initialize as initializeForKidsProject } from '../projects/nftKidsProject'
import { initialize as initializeForKidsProjectNew } from '../projects/nftKidsProjectNew'
import { mobileAndTabletCheck, toDateTime } from '../code/utils'
import { useSenReadyEvent } from '../hooks/useSenReadyEvent'
import { catchWalletOperationErrors } from '../code/catchWalletOperationErrors'

const defaulProject = 'nftKids'

export function App() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isPaperActive, setIsPaperActive] = useState(false)
  const [project, setProject] = useState(defaulProject)
  const [paperCheckoutId, setPaperCheckoutId] = useState('')
  const {
    // lib
    Moralis,
    isInitializing,
    isInitialized,
    web3,
    // states
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
    isAuthenticated,
    isAuthenticating,
    hasAuthError,
    user,
    // func list
    // enableWeb3,
    authenticate,
    deactivateWeb3,
    logout,
    enableWeb3,
  } = useMoralis()
  const { web3Library: ethers } = Moralis
  const authState = {
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
    isAuthenticated,
    isAuthenticating,
    hasAuthError,
  }

  const networkId = '0x89'
  const { switchNetwork, chainId, chain } = useChain()
  const notifier = useNotifier()
  const { bindOnWeb3Enabled, bindOnWeb3Deactivated, bindOnAccountChanged, bindOnChainChanged } =
    useMoralisEventsForward(Moralis, authState, notifier)

  async function getProvider(isReadOnly = false) {
    function getWeb3WindowEthereumProvider() {
      return window.ethereum && new ethers.providers.Web3Provider(window.ethereum)
    }
    function getInfuraProvider() {
      // notifier.tip('infura')
      // console.log('Getting infura provider')
      const NODE_URL =
        // 'https://speedy-nodes-nyc.moralis.io/9fe8dc8cf64177599a32cb80/polygon/mainnet'
        'https://polygon-mainnet.infura.io/v3/6098af69afc940cd9070ab6d774436ea'
      return NODE_URL && new ethers.providers.JsonRpcProvider(NODE_URL)
    }
    if (isReadOnly) {
      console.log('Getting readonly provider')
      // notifier.tip('readonly')
      return web3 || getInfuraProvider()
      // || getWeb3WindowEthereumProvider()
      // || ethers.getDefaultProvider()
    }

    if (isWeb3Enabled) {
      console.log('Getting moralis inner provider')
      const isMobile = mobileAndTabletCheck()
      console.log(web3)
      return isMobile
        ? web3 || getInfuraProvider()
        : new Promise((res, rej) => {
            switchNetwork(networkId)
              .catch(console.error)
              .finally(() => {
                res(web3)
              })
          })
    }
    return new Promise((res, rej) => {
      bindOnWeb3Enabled(({ web3 }) => {
        res(web3)
      }, true)
      connect()
    })
  }
  useEffect(() => {
    const unsub = bindOnWeb3Enabled(() => {
      setIsWalletModalOpen(false)
      switchNetwork(networkId).catch(console.error)
    })
    return unsub
  }, [bindOnWeb3Enabled])

  const connect = useFunctionBinding(
    'connect',
    async () => {
      if (isWeb3EnableLoading || isAuthenticating) {
        // notifier.warning('Wallet connection request has been already sent')
        // throw new Error('Wallet connection request has been already sent')
        console.log('Wallet connection request has been already sent')
      }
      if (isWeb3Enabled && isAuthenticated) {
        // notifier.warning('Wallet is already authenticated and connected')
        // throw new Error('Wallet is already authenticated and connected')
        console.log('Wallet is already authenticated and connected')
      }
      // console.log(isWeb3Enabled, isWeb3EnableLoading, web3EnableError)
      setIsWalletModalOpen(true)

      return !(isWeb3EnableLoading || isAuthenticating || (isWeb3Enabled && isAuthenticated))
      // if (callback) {
      //   const unsubscribe = bindOnWeb3Enabled(() => {
      //     console.log('hi i`m here')
      //     console.log(unsubscribe)
      //     callback && setTimeout(callback, 0)
      //     console.log('hi i`m here2')
      //     unsubscribe()
      //     console.log('hi i`m here3')
      //   })
      // }
    },
    [
      isWeb3Enabled,
      isWeb3EnableLoading,
      web3EnableError,
      bindOnWeb3Enabled,
      isAuthenticating,
      isAuthenticated,
      setIsWalletModalOpen,
    ]
  )
  useFunctionBinding(
    'disconnect',
    () => {
      if (!isWeb3Enabled && !isAuthenticated) {
        // notifier.warning('Already logged out')
        // throw new Error('Already logged out')
        console.error('Already logged out')
      }
      return deactivateWeb3().then(logout)
    },
    [deactivateWeb3]
  )
  useFunctionBinding(
    'getMarketListings',
    (onlyAvaliable = true) => {
      console.log('getMarketListings', onlyAvaliable)
      return getProvider(true) // readonly provider
        .then(getTWSdk)
        .then(getTWMarketplace)
        .then((marketplace) => (onlyAvaliable ? marketplace.getActiveListings() : marketplace.getAllListings()))
        .then((listings) =>
          listings.map((el) => {
            const startSeconds = el.startTimeInSeconds.toNumber()
            el.startedAt = toDateTime(startSeconds)
            const endDateInseconds = startSeconds + el.secondsUntilEnd.toNumber()
            el.endsAt = toDateTime(endDateInseconds)
            el.isEnded = endDateInseconds < new Date().getSeconds()
            el.soldOut = el.quantity.toNumber() < 1
            el.isAvaliable = !el.soldOut && !el.isEnded
            return el
          })
        )
        .then((listings) => listings.filter((el) => !onlyAvaliable || el.isAvaliable))
        .then((listings) => {
          console.log('getMarketListings', listings)
          return listings
        })
    },
    [getProvider]
  )
  useFunctionBinding(
    'mintNFTFromDrop',
    (quantity = 1) => {
      console.log('mintNFTFromDrop', quantity)
      return (
        getProvider()
          .then(getTWSdk)
          .then(getTWNFTDrop)
          .then((drop) => drop.claim(quantity))
          // .then((drop) => getCurrentUserAddress().then((address) => drop.claimTo(address, quantity)))
          // .then((drop) => drop.getAll())
          .then((res) => {
            console.log('mintNFTFromDrop', res)
            return res
          })
          .catch(catchWalletOperationErrors)
      )
    },
    [getProvider]
  )
  useFunctionBinding(
    'getNFTDropInfo',
    () => {
      return getProvider(true) // readonly provider
        .then(getTWSdk)
        .then(getTWNFTDrop)
        .then((drop) => {
          const promises = [drop.totalSupply(), drop.totalUnclaimedSupply(), drop.claimConditions.getActive()]
          return Promise.all(promises).then((values) => {
            const [totalSupply, totalUnclaimedSupply, claimConditions] = values
            console.log('getNFTDropInfo', values) // [3, 42, "foo"]
            return { totalSupply, totalUnclaimedSupply, claimConditions }
          })
        })
    },
    [getProvider]
  )
  useFunctionBinding(
    'getNFTDropsOwnedByUser',
    () => {
      return getProvider() // not readonly to require user to connect wallet before
        .then(getTWSdk)
        .then(getTWNFTDrop)
        .then((drop) => drop.getOwned(account))
        .then((drops) => {
          console.log('getNFTDropsOwnedByUser', drops)
          return drops
        })
    },
    [getProvider, account]
  )
  useFunctionBinding(
    'getEditionNfts',
    () => {
      return getProvider() // not readonly to require user to connect wallet before
        .then(getTWSdk)
        .then(getTWEdition)
        .then((edition) => edition.getAll())
        .then((nfts) => {
          console.log('getEditionNfts', nfts)
          return nfts
        })
    },
    [getProvider]
  )
  useFunctionBinding(
    'getCurrentUserAddress',
    async () => {
      return account
    },
    [account]
  )
  useFunctionBinding(
    'getCurrentUserChain',
    async () => {
      return chain
    },
    [chain]
  )
  useFunctionBinding(
    'getEditionNftsOwnedByUser',
    () => {
      return getProvider() // not readonly to require user to connect wallet before
        .then(getTWSdk)
        .then(getTWEdition)
        .then((edition) => edition.getOwned(account))
        .then((nfts) => {
          console.log('getEditionNftsOwnedByUser', nfts)
          return nfts
        })
        .catch(console.error)
    },
    [getProvider, account]
  )
  useFunctionBinding(
    'buyNft',
    (listingId, quantity = 1) => {
      return getProvider() // not readonly to require user to connect wallet before
        .then(getTWSdk)
        .then(getTWMarketplace)
        .then((marketplace) => marketplace.direct.buyoutListing(listingId, quantity))
        .catch(catchWalletOperationErrors)
    },
    [getProvider]
  )
  useFunctionBinding(
    'buyPaperNft',
    (paperCheckoutId) => {
      setPaperCheckoutId(paperCheckoutId)
      setIsPaperActive(true)
    },
    [getProvider]
  )
  useFunctionBinding(
    'initialize',
    (project = defaulProject) => {
      const path = project.split('/')
      switch (path[0]) {
        case 'nftKids':
          setProject(project)
          initializeForKidsProject()
          break
        case 'mintSite':
          setProject(project)
          initializeForMintProject()
          break
        case 'nftKidsNew':
          const page = path[1]
          setProject(project)
          initializeForKidsProjectNew(page)
          break
        default:
          throw new Error('Wrong project name')
      }
    },
    []
  )
  useSenReadyEvent(isInitialized)
  const showDebugInfo = location.hostname.match('b1tlite.github.io')
  const dappUrl = 'b1tlite.github.io/dist/index.html' // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
  const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl
  return (
    <>
      {showDebugInfo && (
        <p style={{ overflowWrap: 'anywhere' }}>
          {/* <a href={metamaskAppDeepLink}>
            <button>Connect via deeplink</button>
          </a> */}
          {JSON.stringify({
            account,
            authState,
            chainId,
            chain,
            user,
            metamaskAppDeepLink,
            ethersLib: !!window.ethereum,
          })}
        </p>
      )}
      {isWalletModalOpen && <WalletModal closeModal={() => setIsWalletModalOpen(false)} sdkConnect={enableWeb3} />}

      {isPaperActive && (
        <PaperCheckout
          checkoutId={paperCheckoutId}
          display="DRAWER"
          options={{
            width: 400,
            height: 800,
            colorBackground: '#232323',
            colorPrimary: '#42ff4f',
            colorText: '#f1fde3',
            borderRadius: 6,
            fontFamily: 'Open Sans',
          }}
        />
      )}
    </>
  )
}

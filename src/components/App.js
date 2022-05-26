import React, { useState, useCallback, useEffect } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import { WalletModal } from 'web3uikit'

import { useFunctionBinding } from '../hooks/useFunctionBinding'
import { useMoralisEventsForward } from '../hooks/useMoralisEventsForward'
import { useNotifier } from '../hooks/useNotifier'

import { getTWSdk, getTWMarketplace, getTWNFTDrop, getTWEdition } from '../code/thirdWebUtils'
import { initialize as initializeForMintProject } from '../projects/mintProject'
import { initialize as initializeForKidsProject } from '../projects/nftKidsProject'
import { mobileAndTabletCheck, toDateTime } from '../code/utils'
import { useSenReadyEvent } from '../hooks/useSenReadyEvent'
import { catchWalletOperationErrors } from '../code/catchWalletOperationErrors'

export function App() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
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

  const { switchNetwork, chainId, chain } = useChain()
  const notifier = useNotifier()
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
      // notifier.tip('inner ' + isMobile + '   ' + !!web3.getSigner())
      return isMobile
        ? web3 || getInfuraProvider()
        : new Promise((res, rej) => {
            switchNetwork('0x89')
              .catch(console.error)
              .finally(() => {
                // notifier.tip('inner4')
                res(web3)
              })
          })
    }
    // notifier.tip('coonect err')
    // connect()
    throw new Error('Connect wallet first!')
  }
  const connect = useFunctionBinding(
    'connect',
    () => {
      if (isWeb3EnableLoading || isAuthenticating) {
        // notifier.warning('Wallet connection request has been already sent')
        // throw new Error('Wallet connection request has been already sent')
        console.log('Wallet connection request has been already sent')
      }
      if (isWeb3Enabled && isAuthenticated) {
        // notifier.warning('Wallet is already authenticated and connected')
        // throw new Error('Wallet is already authenticated and connected')
        console.error('Wallet is already authenticated and connected')
      }
      // console.log(isWeb3Enabled, isWeb3EnableLoading, web3EnableError)
      // console.log('mobileAndTabletCheck', mobileAndTabletCheck())
      // const isDesktop = !mobileAndTabletCheck()
      // if (isDesktop) {

      // } else {
      // // for metamask browser
      const basicArgs = {
        // chainId: 137,

        signingMessage:
          "Hello and welcome to our awesome project. Please sign this message to authenticate. It won't cost you any gas!",
      }
      // const mobileArgs = {
      //   chainId: 137,
      //   signingMessage:
      //     "Hello and welcome to our awesome project. Please sign this message to authenticate. It won't cost you any gas!",
      //   provider: 'walletconnect',
      //   mobileLinks: ['metamask', 'rainbow', 'argent', 'trust', 'imtoken', 'pillar'],
      // }

      // return authenticate()
      // setIsWalletModalOpen(true)
      // window.addEventListener('onWeb3Enabled', () => {
      //   // setIsWalletModalOpen(false)
      //   // window.removeEventListener('onWalletAuthenticated', onAuthSucc)
      // })

      const baseOptins = {
        throwOnError: true,
      }

      return enableWeb3(baseOptins)
        .catch(() => {
          // notifier.info('1')
          return enableWeb3({
            ...baseOptins,
            ...{
              provider: 'metamask',
            },
          })
        })
        .catch(() => {
          // notifier.info('2')
          return enableWeb3({
            ...baseOptins,
            ...{
              provider: 'walletconnect',
            },
          })
        })
        .catch(() => {
          // notifier.info('3')
          return enableWeb3({
            ...baseOptins,
            ...{
              provider: 'walletConnect',
            },
          })
        })
        .catch(() => {
          // notifier.info('4')
          return enableWeb3({
            ...baseOptins,
            ...{
              provider: 'web3Auth',
            },
          })
        })
        .catch((err) => {
          notifier.info('5' + JSON.stringify(err))
          console.error(err)
        })
      // }
    },
    [isWeb3Enabled, isWeb3EnableLoading, web3EnableError, authenticate]
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
    'initialize',
    (project = 'nftKids') => {
      switch (project) {
        case 'nftKids':
          initializeForKidsProject()
          break
        case 'mintSite':
          initializeForMintProject()
          break
        default:
          throw new Error('Wrong project name')
      }
    },
    []
  )
  useSenReadyEvent(isInitialized)

  return (
    <>
      {/* <p style={{ overflowWrap: 'anywhere' }}>
          {JSON.stringify({
            account,
            chainId,
            chain,
            authState,
            user,
          })}
        </p> */}
      <WalletModal
        isOpened={isWalletModalOpen}
        setIsOpened={setIsWalletModalOpen}
        moralisAuth={false}
        signingMessage={
          "Hello and welcome to our awesome project. Please sign this message to authenticate. It won't cost you any gas!"
        }
      />
    </>
  )
}

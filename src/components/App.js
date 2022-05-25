import React, { useState, useCallback, useEffect } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import { WalletModal } from 'web3uikit'

import { useFunctionBinding } from '../hooks/useFunctionBinding'
import { useMoralisEventsForward } from '../hooks/useMoralisEventsForward'
import { useNotifier } from '../hooks/useNotifier'

import { getTWSdk, getTWMarketplace, getTWNFTDrop, getTWEdition } from '../code/thirdWebUtils'
import { initialize as initializeForMintProject } from '../projects/mintProject'
import { initialize as initializeForKidsProject } from '../projects/nftKidsProject'
import { toDateTime } from '../code/utils'
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
  const getProvider = useCallback(
    async (isReadOnly = false) => {
      function getWeb3WindowEthereumProvider() {
        return window.ethereum && new ethers.providers.Web3Provider(window.ethereum)
      }
      function getInfuraProvider() {
        // console.log('Getting infura provider')
        const NODE_URL =
          // 'https://speedy-nodes-nyc.moralis.io/9fe8dc8cf64177599a32cb80/polygon/mainnet'
          'https://polygon-mainnet.infura.io/v3/6098af69afc940cd9070ab6d774436ea'
        return NODE_URL && new ethers.providers.JsonRpcProvider(NODE_URL)
      }
      if (isReadOnly) {
        console.log('Getting readonly provider')
        return web3 || getInfuraProvider()
        // || getWeb3WindowEthereumProvider()
        // || ethers.getDefaultProvider()
      }
      if (isWeb3Enabled || isAuthenticated) {
        console.log('Getting moralis inner provider')
        // checkAndFixNetwork(web3)
        switchNetwork('0x89')
        return web3
      }
      notifier.warning('Connect wallet first!')
      connect()
      // console.error('Connect wallet first!')
      throw new Error('Connect wallet first!')
    },
    [connect, ethers, web3, isWeb3Enabled, isAuthenticated]
  )
  const connect = useFunctionBinding(
    'connect',
    () => {
      function mobileAndTabletCheck() {
        let check = false
        ;(function (a) {
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
              a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              a.substr(0, 4)
            )
          )
            check = true
        })(navigator.userAgent || navigator.vendor || window.opera)
        return check
      }
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
        chainId: 137,
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
      setIsWalletModalOpen(true)
      window.addEventListener('onWalletAuthenticated', () => {
        setIsWalletModalOpen(false)
        // window.removeEventListener('onWalletAuthenticated', onAuthSucc)
      })
      authenticate(basicArgs)
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
        moralisAuth
        signingMessage={
          "Hello and welcome to our awesome project. Please sign this message to authenticate. It won't cost you any gas!"
        }
      />
    </>
  )
}

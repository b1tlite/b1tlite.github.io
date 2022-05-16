import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Moralis from 'moralis/dist/moralis.min.js'
import { onMetamuskNotInstalled } from './ui'
const ethers = Moralis.web3Library

window.senState = window.senState || {}
let isMoralisStared = false
Moralis.onWeb3Enabled((result) => {
  const { account, chainId, connector, web3, provider } = result
  window.senState.currentAccount = account
  window.senState.currentChain = chainId
  window.senState.connector = connector
  window.senState.provider = provider
  window.senState.web3Provider = web3

  console.log('onWeb3Enabled', result)
  window.dispatchEvent(new CustomEvent('onWeb3Enabled'), result)
})
Moralis.onWeb3Deactivated((result) => {
  window.senState.currentAccount = null
  console.log('onWeb3Deactivated', result)
  window.dispatchEvent(new CustomEvent('onWeb3Deactivated'), result)
})
Moralis.onAccountChanged(async function (account) {
  window.senState.currentAccount = account
  console.log('onAccountsChanged', account)
  window.dispatchEvent(new CustomEvent('onAccountChanged'), account)
  // const confirmed = confirm('Link this address to your account?');
  // if (confirmed) {
  // await Moralis.Web3.link(accounts[0]);
  // alert('Address added!');
  // }
})

Moralis.onChainChanged(async function (chainId) {
  window.senState.currentChain = chainId
  console.log('onChainChanged', chainId)
  window.dispatchEvent(new CustomEvent('onChainChanged'), chainId)
})

export async function connect() {
  !isMoralisStared && initializeMoralis()
  await enableWeb3()
}

export async function checkAndFixNetwork() {
  try {
    await web3.currentProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x89' }],
    })
  } catch (error) {
    if (error.code === 4902) {
      try {
        await web3.currentProvider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89',
              chainName: 'Polygon Mainnet',
              rpcUrls: ['https://polygon-rpc.com'],
              nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18,
              },
              blockExplorerUrls: ['https://polygonscan.com/'],
            },
          ],
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export async function enableWeb3() {
  // if (!Moralis.isWeb3Enabled()) {
  console.log('Connecting')
  await Moralis.enableWeb3()
  console.log('Connected')
  // } else {
  // console.log('Already connected')
  // }
  // await checkAndFixNetwork()
}
function isAlreadyConnected() {
  if (window.ethereum) {
    return window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => accounts.length === 0)
  }

  return new Promise((res, rej) => {
    console.error('Metamusk not installed!')
    onMetamuskNotInstalled && onMetamuskNotInstalled()
    res()
  })
}
export function checkIfAlreadyConnected() {
  isAlreadyConnected().then((isConnected) => {
    if (isConnected) return Moralis.enableWeb3()
  })
}
export async function disableWeb3() {
  await Moralis.deactivateWeb3()
  console.log('logged out')
}
export function initializeMoralis() {
  const serverUrl = 'https://6hiqo5aptzjt.usemoralis.com:2053/server' //Server url from moralis.io
  const appId = '4tLI25e1VFuYR6InpKuVqIp4T6zXSa8pHmrh0BBz' // Application id from moralis.io
  Moralis.start({ serverUrl, appId })
  isMoralisStared = true
}
function getMarketplace(sdk) {
  return sdk.getMarketplace('0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9')
}
function getEdition(sdk) {
  return sdk.getEdition('0x5425fC8BF42501386C9920B3a7044ACB700278ee')
}
export function getNfts() {
  return getProvider(true) // readonly provider
    .then(getSdk)
    .then(getMarketplace)
    .then((marketplace) => marketplace.getActiveListings())
    .then((listings) => listings.filter((el) => el.quantity.toNumber() > 0))
}
function getSdk(provider) {
  return new ThirdwebSDK(provider.getSigner() || provider)
}
function getProvider(isReadOnly = false) {
  if (!isReadOnly)
    return Moralis.enableWeb3().then((provider) => {
      checkAndFixNetwork()
      return provider
    })

  return new Promise((res, rej) => {
    const NODE_URL =
      // 'https://speedy-nodes-nyc.moralis.io/9fe8dc8cf64177599a32cb80/polygon/mainnet'
      'https://polygon-mainnet.infura.io/v3/6098af69afc940cd9070ab6d774436ea'
    res(new ethers.providers.JsonRpcProvider(NODE_URL))
  })
}
export function buyNft(listingId, quantity = 1) {
  console.log('Trying to buy:', listingId, quantity)
  return checkAndFixNetwork()
    .then(getProvider)
    .then(getSdk)
    .then(getMarketplace)
    .then((marketplace) => marketplace.direct.buyoutListing(listingId, quantity))
}

export async function getCurrentUserAddress() {
  return window.senState.currentAccount
}
export function isUserOwnsSomeNfts() {
  return getNFTsOwnedByUser().then((nfts) => !!(nfts && nfts.length && nfts.length > 0))
}
export function getNFTsOwnedByUser() {
  if (!getCurrentUserAddress()) {
    console.error('Connect wallet first with sen.web3.connect()')
    throw new Error('Connect wallet first with sen.web3.connect()')
  }
  return getProvider(true) // readonly provider
    .then(getSdk)
    .then(getEdition)
    .then((edition) => getEditionNftsOwnedByMe(edition))
}

export async function getAllEditionNfts(edition) {
  const nfts = await edition.getAll()
  console.log(nfts.map((e) => e.metadata.id.toNumber()))
  return nfts
}
export async function getEditionNftsOwnedBy(edition, address) {
  console.log('getEditionNftsOwnedBy', address)
  const nfts = await edition.getOwned(address)
  console.log(nfts.map((e) => e.metadata.id.toNumber()))
  return nfts
}
export async function getEditionNftsOwnedByMe(edition) {
  return await getEditionNftsOwnedBy(edition, window.senState.currentAccount)
}

// import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from '@thirdweb-dev/sdk'
// import {
//   getProvider,
//   getBalance,
//   toNumber,
//   getProviderSigner,
//   getWallet,
//   getWalletInfoAsync,
// } from './ethres-utils.js'
// export async function getCurrentListings(marketplace) {
//   const listings = await marketplace.getActiveListings()
//   console.log('Current listings', listings)
//   return listings
// }
// export function getListingInfo(
//   assetContractAddress,
//   tokenId,
//   quantity = 1,
//   price = '0.1'
// ) {
//   const listingInfo = {
//     assetContractAddress: assetContractAddress,
//     tokenId: tokenId, // '1'
//     startTimestamp: { getTime: () => Date.now() },
//     listingDurationInSeconds: 60 * 60 * 24 * 30 * 6,
//     quantity: quantity,
//     currencyContractAddress: NATIVE_TOKEN_ADDRESS,
//     buyoutPricePerToken: price,
//   }

//   console.log('Listing info:', listingInfo)
//   return listingInfo
// }
// export async function listItem(marketplace, listingInfo) {
//   try {
//     await marketplace.direct.createListing(listingInfo)
//   } catch (err) {
//     console.log(err)
//   }
// }

// export function getMarket(sdk, marketAddress) {
//   console.log('Try get market from address', marketAddress)
//   const market = sdk.getMarketplace(marketAddress)
//   // console.log('Market', market);
//   console.log(
//     'Got market from address',
//     market.contractWrapper.readContract.address
//   )
//   return market
// }

// export function getEdition(sdk, editionAddress) {
//   console.log('Try get edition from address', editionAddress)
//   const edition = sdk.getEdition(editionAddress)
//   // console.log('Edition', edition);
//   console.log(
//     'Got edition from address',
//     edition.contractWrapper.readContract.address
//   )
//   return edition
// }

// export function getThirdWebSdk() {
//   const provider = getProvider()
//   const wallet = getWallet(provider)
//   return new ThirdwebSDK(wallet, {
//     readonlySettings: {
//       chainId: 137,
//       rpcUrl:
//         'https://speedy-nodes-nyc.moralis.io/9fe8dc8cf64177599a32cb80/polygon/mainnet',
//     },
//     gasSettings: {
//       speed: 'fastest',
//       maxPriceInGwei: 500,
//     },
//   })
// }

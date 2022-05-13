import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import Moralis from 'moralis/dist/moralis.min.js'
import { onMetamuskNotInstalled } from './ui'

let isMoralisStared = false
let currentAccount
Moralis.onWeb3Enabled((result) => {
  const { account } = result
  currentAccount = account
  console.log(result)
  window.dispatchEvent(new CustomEvent('onWeb3Enabled'), result)
})
Moralis.onWeb3Deactivated((result) => {
  currentAccount = null
  console.log(result)
  window.dispatchEvent(new CustomEvent('onWeb3Deactivated'), result)
})

export function connect() {
  !isMoralisStared && initializeMoralis()
  enableWeb3()
}

export async function enableWeb3() {
  if (!Moralis.isWeb3Enabled()) {
    console.log('Connecting')
    await Moralis.enableWeb3()
    console.log('Connected')
  } else {
    console.log('Already connected')
  }
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
  if (!isReadOnly) return Moralis.enableWeb3()

  return new Promise((res, rej) => {
    const NODE_URL =
      // 'https://speedy-nodes-nyc.moralis.io/9fe8dc8cf64177599a32cb80/polygon/mainnet'
      'https://polygon-mainnet.infura.io/v3/6098af69afc940cd9070ab6d774436ea'
    res(new ethers.providers.JsonRpcProvider(NODE_URL))
  })
}
export function buyNft(listingId, quantity = 1) {
  console.log('Trying to buy:', listingId, quantity)
  return getProvider()
    .then(getSdk)
    .then(getMarketplace)
    .then((marketplace) => marketplace.direct.buyoutListing(listingId, quantity))
}

export function isUserOwnsSomeNfts() {
  return getNFTsOwnedByUser.then((nfts) => nfts && nfts.length && nfts.length > 0)
}
export function getNFTsOwnedByUser() {
  if (!currentAccount) {
    console.error('Connect wallet first with sen.web3.connect()')
    throw new Error('Connect wallet first with sen.web3.connect()')
  }
  return getProvider(true) // readonly provider
    .then(getSdk)
    .then(getEdition)
    .then((edition) => getEditionNftsOwnedBy(edition))
}

export async function getAllEditionNfts(edition) {
  const nfts = await edition.getAll()
  console.log(nfts.map((e) => e.metadata.id.toNumber()))
  return nfts
}
export async function getEditionNftsOwnedBy(edition, adrress) {
  const nfts = await edition.getOwned(adrress)
  console.log(nfts.map((e) => e.metadata.id.toNumber()))
  return nfts
}
export async function getEditionNftsOwnedByMe(edition) {
  return await getEditionNftsOwnedBy(edition, process.env.WALLET_ADDRESS)
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

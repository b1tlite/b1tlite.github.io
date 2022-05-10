import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import Moralis from 'moralis/dist/moralis.min.js'
import { onMetamuskNotInstalled } from './chain'

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
    return window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => accounts.length === 0)
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
}
function getMarketplace(sdk) {
  return sdk.getMarketplace('0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9')
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
    .then((marketplace) =>
      marketplace.direct.buyoutListing(listingId, quantity)
    )
}

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
  return new Promise((res, rej) => {
    if (!window.ethereum) {
      console.error('Install metamusk!')
      onMetamuskNotInstalled && onMetamuskNotInstalled()
      res()
    }
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        res(accounts.length === 0)
      })
      .catch(rej)
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
  return new Promise((res, rej) => {
    getProvider(true) // readonly provider
      .then(getSdk)
      .then(getMarketplace)
      .then((marketplace) => marketplace.getActiveListings())
      .then((listings) => listings.filter((el) => el.quantity.toNumber() > 0))
      .then(res)
      .catch(rej)
  })
}
function getSdk(provider) {
  return new Promise((res, rej) => {
    res(new ThirdwebSDK(provider.getSigner() || provider))
  })
}
function getProvider(isReadOnly = false) {
  return new Promise((res, rej) => {
    if (isReadOnly) {
      const NODE_URL =
        'https://speedy-nodes-nyc.moralis.io/9fe8dc8cf64177599a32cb80/polygon/mainnet'
      res(new ethers.providers.JsonRpcProvider(NODE_URL))
    } else {
      // signer
      Moralis.enableWeb3().then(res).catch(rej)
    }
  })
}
export function buyNft(listingId, quantity = 1) {
  return new Promise((res, rej) => {
    getProvider()
      .then(getSdk)
      .then(getMarketplace)
      .then((marketplace) =>
        marketplace.direct.buyoutListing(listingId, quantity)
      )
      .then(res)
      .catch(rej)
  })
}

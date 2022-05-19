import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import blockies from 'ethereum-blockies-png'
import Moralis from 'moralis/dist/moralis.min.js'
import { toDateTime } from './ui/utils'
const ethers = Moralis.web3Library

window.senState = window.senState || {}
window.senState.ethers = ethers
window.senState.Moralis = Moralis
window.senState.ThirdwebSDK = ThirdwebSDK
window.senState.isMoralisStared = false

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

export function bindOnWeb3Enabled(cb) {
  // Subscribe to onWeb3Enabled events
  const unsubscribe = Moralis.onWeb3Enabled((result) => {
    // console.log('onWeb3Enabled', result)
    cb && cb(result)
  })
  return unsubscribe
}

export function bindOnWeb33Deactivated(cb) {
  // Subscribe to onWeb3Enabled events
  const unsubscribe = Moralis.onWeb3Deactivated((result) => {
    // console.log('onWeb3Deactivated', result)
    cb && cb(result)
  })
  return unsubscribe
}

export async function connect() {
  !window.senState.isMoralisStared && initializeMoralis()
  return await enableWeb3()
}

export async function disconnect() {
  return await disableWeb3()
}

export async function checkAndFixNetwork() {
  try {
    return await web3.currentProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x89' }],
    })
  } catch (error) {
    if (error.code === 4902) {
      try {
        return await AddPolygonChain()
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export async function AddPolygonChain() {
  return await web3.currentProvider.request({
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
}

export function getUserBlockieImageDataUrl() {
  return getCurrentUserAddress().then((address) => blockies.createDataURL({ seed: address }))
}

export function getUserBlockieImageBuffer() {
  return getCurrentUserAddress().then((address) => blockies.createBuffer({ seed: address }))
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
    return window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => accounts.length !== 0)
  }

  return new Promise((res, rej) => {
    console.error('Metamusk not installed!')
    // onMetamuskNotInstalled && onMetamuskNotInstalled()
    res(false)
  })
}
export function checkIfAlreadyConnected() {
  return isAlreadyConnected().then((isConnected) => {
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
  window.senState.isMoralisStared = true
}
function getMarketplace(sdk) {
  return sdk.getMarketplace('0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9') // my
}
function getEdition(sdk) {
  return sdk.getEdition('0x5425fC8BF42501386C9920B3a7044ACB700278ee') // kirill
}
function getNFTDrop(sdk) {
  return sdk.getNFTDrop('0x54B50e5bFFf2adA3748b6F7004dE6761fC2E89D0') // my
}

export function mintNFTFromDrop(quantity = 1) {
  console.log('Trying to mint from drop', quantity)
  return (
    getProvider()
      .then(getSdk)
      .then(getNFTDrop)
      .then((drop) => drop.claim(quantity))
      // .then((drop) => getCurrentUserAddress().then((address) => drop.claimTo(address, quantity)))
      // .then((drop) => drop.getAll())
      .then((res) => {
        console.log('mintNFTFromDrop', res)
        return res
      })
  )
  //
}

export function getNFTDropInfo() {
  return getProvider(true) // read
    .then(getSdk)
    .then(getNFTDrop)
    .then(getDropInfo)
}

export function getNFTDropsOwnedByUser() {
  return getProvider(true) // read
    .then(getSdk)
    .then(getNFTDrop)
    .then(getOwnedDrops)
}

function getDropInfo(drop) {
  return Promise.all([drop.totalSupply(), drop.totalUnclaimedSupply()]).then((values) => {
    const [totalSupply, totalUnclaimedSupply] = values
    console.log('getDropInfo', values) // [3, 42, "foo"]
    return { totalSupply, totalUnclaimedSupply }
  })
}

function getOwnedDrops(drop) {
  return getCurrentUserAddress()
    .then((address) => drop.getOwned(address))
    .then((drops) => {
      console.log('getNFTDropsOwnedByUser', drops)
      return drops
    })
}
export function getEditionNfts() {
  return getProvider(true) // readonly provider
    .then(getSdk)
    .then(getEdition)
    .then(getAllEditionNfts)
}
export function getMarketListings(onlyAvaliable = true) {
  return (
    getProvider(true) // readonly provider
      .then(getSdk)
      .then(getMarketplace)
      // .then((marketplace) => marketplace.getAllListings())
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
  )
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
export async function getCurrentUserChain() {
  return window.senState.currentChain
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
  // console.log(nfts.map((e) => e.metadata.id.toNumber()))
  console.log('getAllEditionNfts', nfts)
  return nfts
}
export async function getEditionNftsOwnedBy(edition, address) {
  console.log('getEditionNftsOwnedBy', address)
  const nfts = await edition.getOwned(address)
  console.log('getEditionNftsOwnedBy', nfts)
  return nfts
}
export async function getEditionNftsOwnedByMe(edition) {
  return await getEditionNftsOwnedBy(edition, window.senState.currentAccount)
}

// import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from '@thirdweb-dev/sdk'

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

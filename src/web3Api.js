import { ThirdwebSDK } from '@thirdweb-dev/sdk'
// import blockies from 'ethereum-blockies-png'
import Moralis from 'moralis/dist/moralis.min.js'
import { toDateTime } from './utils'
const ethers = Moralis.web3Library
const WalletConnectProvider = require('@walletconnect/web3-provider/dist/umd/index.min.js')
// import WalletConnectProvider from "@walletconnect/web3-provider";
// window.WalletConnectProvider = WalletConnectProvider
function checkAndFixNetwork2(provider) {
  function addPolygonChain(provider) {
    console.log('addPolygonChain')
    return provider.send('wallet_addEthereumChain', [
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
    ])
  }
  console.log('checkAndFixNetwork')
  try {
    return provider.send('wallet_switchEthereumChain', [{ chainId: '0x89' }])
  } catch (error) {
    console.log('checkAndFixNetwork', 'error while switching the network')
    if (error.code === 4902) {
      try {
        console.log('checkAndFixNetwork', 'network not found')
        return addPolygonChain(provider)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
window.mobileAndTabletCheck = function () {
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

// export function getUserBlockieImageDataUrl() {
//   return getCurrentUserAddress().then((address) => blockies.createDataURL({ seed: address }))
// }

// export function getUserBlockieImageBuffer() {
//   return getCurrentUserAddress().then((address) => blockies.createBuffer({ seed: address }))
// }

export async function enableWeb3() {
  // if (!Moralis.isWeb3Enabled()) {
  console.log('Connecting')
  // await Moralis.enableWeb3()
  const basicArgs = {
    chainId: 137,
    signingMessage:
      "Hello and welcome to our awesome project. Please sign this message to authenticate. It won't cost you any gas!",
  }
  const mobileArgs = {
    provider: 'walletconnect',
    mobileLinks: ['metamask', 'rainbow', 'argent', 'trust', 'imtoken', 'pillar'],
  }
  const desktopArgs = {}
  const agrs = { ...basicArgs, ...(window.mobileAndTabletCheck() ? mobileArgs : desktopArgs) }
  await Moralis.authenticate(agrs)
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

async function getDropInfo(drop) {
  return Promise.all([drop.totalSupply(), drop.totalUnclaimedSupply(), drop.claimConditions.getActive()]).then(
    (values) => {
      const [totalSupply, totalUnclaimedSupply, claimConditions] = values
      console.log('getDropInfo', values) // [3, 42, "foo"]
      return { totalSupply, totalUnclaimedSupply, claimConditions }
    }
  )
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

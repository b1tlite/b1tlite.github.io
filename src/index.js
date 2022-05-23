import { runScene } from './three/three-lib'
import { initReact } from './react'
import { initialize } from './ui/ui'
// import {
//   buyNft,
//   getMarketListings,
//   getNFTsOwnedByUser,
//   isUserOwnsSomeNfts,
//   getCurrentUserAddress,
//   getCurrentUserChain,
//   connect,
//   disconnect,
//   getEditionNfts,
//   getNFTDropInfo,
//   getNFTDropsOwnedByUser,
//   // getUserBlockieImageDataUrl,
//   // getUserBlockieImageBuffer,
// } from './web3Api'

const funcs = [
  'isUserOwnsSomeNfts',
  'connect',
  'disconnect',
  'getMarketListings',
  'buyNft',
  'getEditionNftsOwnedByUser',
  'getCurrentUserAddress',
  'getCurrentUserChain',
  'getEditionNfts',
  'getNFTDropInfo',
  'getNFTDropsOwnedByUser',
  'mintNFTFromDrop',
]

// const web3 = {
//   isUserOwnsSomeNfts,
//   connect,
//   disconnect,
//   getNfts: getMarketListings,
//   getMarketListings,
//   buyNft,
//   getNFTsOwnedByUser,
//   getCurrentUserAddress,
//   getCurrentUserChain,
//   getEditionNfts,
//   getNFTDropInfo,
//   getNFTDropsOwnedByUser,
//   // getUserBlockieImageDataUrl,
//   // getUserBlockieImageBuffer,
// }
initReact()

const web3 = {}
funcs.forEach((funcName) => {
  web3[funcName] = function () {
    if (!window.senInner) {
      throw new Error('No senInner')
    }
    if (!window.senInner[funcName]) {
      throw new Error('No window.senInner[funcName]', funcName)
    }

    window.senInner[funcName].apply(null, arguments)
  }
})

const three = { runScene }

if (window && !window.sen) {
  window.sen = { initialize, web3, three }
}

export { initialize, web3, three }

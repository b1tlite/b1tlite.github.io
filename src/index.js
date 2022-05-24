import { initReact } from './react'

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
  'initialize',
]

/////////////////
// call to get state objects
// and create all functions in window.senInner
initReact()
/////////

const web3 = {}
funcs.forEach((funcName) => {
  web3[funcName] = function () {
    if (!window.senInner) {
      throw new Error('No senInner. Inner lib error.')
    }
    if (!window.senInner[funcName]) {
      throw new Error('No window.senInner[funcName]. Inner lib error.', funcName)
    }

    return window.senInner[funcName].apply(null, arguments)
  }
})

const initialize = web3.initialize

if (window) {
  window.sen = window.sen || { web3, initialize }
}

export { web3, initialize }

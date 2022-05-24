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
    const incomingArgs = arguments
    const isReady = window.senInner && window.senInner[funcName]
    function execute() {
      if (!window.senInner) {
        throw new Error('No senInner. Inner lib error.')
      }
      if (!window.senInner[funcName]) {
        throw new Error('No window.senInner[funcName]. Inner lib error.', funcName)
      }

      return window.senInner[funcName].apply(null, incomingArgs)
    }
    if (!isReady) {
      return new Promise((res, rej) => {
        if (isReady) {
          res(execute())
        }
        window.addEventListener(
          'onSenReady',
          () => {
            res(execute())
          },
          false
        )
      })
    }
    return execute()
  }
})

const initialize = web3.initialize

if (window) {
  window.sen = window.sen || { web3, initialize }
}

export { web3, initialize }

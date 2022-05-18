import { runScene } from './three/three-lib'
import { initialize } from './ui/ui'
import {
  buyNft,
  getMarketListings,
  getNFTsOwnedByUser,
  isUserOwnsSomeNfts,
  getCurrentUserAddress,
  getCurrentUserChain,
  connect,
  disconnect,
  getEditionNfts,
  getNFTDropInfo,
} from './web3Api'

const web3 = {
  isUserOwnsSomeNfts,
  connect,
  disconnect,
  getNfts: getMarketListings,
  getMarketListings,
  buyNft,
  getNFTsOwnedByUser,
  getCurrentUserAddress,
  getCurrentUserChain,
  getEditionNfts,
  getNFTDropInfo,
}

const three = { runScene }

if (window && !window.sen) {
  window.sen = { initialize, web3, three }
}

export { initialize, web3, three }

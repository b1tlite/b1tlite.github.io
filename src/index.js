import { runScene } from './three/three-lib'
import { initialize } from './ui/ui'
import {
  buyNft,
  getNfts,
  getNFTsOwnedByUser,
  isUserOwnsSomeNfts,
  getCurrentUserAddress,
  getCurrentUserChain,
  connect,
  disconnect,
} from './web3Api'

const web3 = {
  isUserOwnsSomeNfts,
  connect,
  disconnect,
  getNfts,
  buyNft,
  getNFTsOwnedByUser,
  getCurrentUserAddress,
  getCurrentUserChain,
}

const three = { runScene }

if (window && !window.sen) {
  window.sen = { initialize, web3, three }
}

export { initialize, web3, three }

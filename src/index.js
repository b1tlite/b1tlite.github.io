import { init } from './old'
import { runScene } from './three/three-lib'
import { initialize } from './ui'
import {
  buyNft,
  disableWeb3,
  enableWeb3,
  getNfts,
  getNFTsOwnedByUser,
  isUserOwnsSomeNfts,
  getCurrentUserAddress,
} from './web3Api'

const web3 = {
  isUserOwnsSomeNfts,
  connect: enableWeb3,
  disconnect: disableWeb3,
  getNfts,
  buyNft,
  getNFTsOwnedByUser,
  getCurrentUserAddress,
}
const three = { runScene }
if (window) {
  window.sen = { init, getNfts, initialize, web3, three }
}

export { init, getNfts, initialize, web3, three }

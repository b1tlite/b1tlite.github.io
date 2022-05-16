import { init } from './old'
import { runScene } from './three-lib'
import { initialize } from './ui'
import { buyNft, disableWeb3, enableWeb3, getNfts, getNFTsOwnedByUser, isUserOwnsSomeNfts } from './web3Api'

const web3 = { isUserOwnsSomeNfts, connect: enableWeb3, disconnect: disableWeb3, getNfts, buyNft, getNFTsOwnedByUser }
const three = { runScene }
export { init, getNfts, initialize, web3, three }

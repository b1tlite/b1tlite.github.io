import { init } from './old'
import { initialize } from './ui'
import { buyNft, disableWeb3, enableWeb3, getNfts, getNFTsOwnedByUser, isUserOwnsSomeNfts } from './web3Api'

const web3 = { isUserOwnsSomeNfts, connect: enableWeb3, disconnect: disableWeb3, getNfts, buyNft, getNFTsOwnedByUser }
export { init, getNfts, initialize, web3 }

// import Moralis from 'moralis/types'
import { runScene } from '../three/three-lib'
import { bindActions as bindActionsThree, setupHtmlForThree } from '../three/three-ui'
import { initializeMoralis, checkIfAlreadyConnected, getMarketListings } from '../web3Api'
import { bindActions as bindActionsKids, loadNfts } from './nftKids'

export async function initialize(project = 'nftKids') {
  switch (project) {
    case 'nftKids':
      bindActionsKids()
      initializeMoralis()
      checkIfAlreadyConnected()
      loadNfts()
      break

    case 'mintSite':
      setupHtmlForThree()
      runScene()
      bindActionsThree()
      initializeMoralis()
      checkIfAlreadyConnected()
      getMarketListings()
      break

    default:
      break
  }
}

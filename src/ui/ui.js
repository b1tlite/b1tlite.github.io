// import Moralis from 'moralis/types'
import { runScene } from '../three/three-lib'
import { bindActions as bindActionsThree, setupHtmlForThree, populatePopupWithDropInfo } from '../three/three-ui'
import {
  initializeMoralis,
  checkIfAlreadyConnected,
  getMarketListings,
  getNFTDropInfo,
  getNFTsOwnedByUser,
  getNFTDropsOwnedByUser,
} from '../web3Api'
import { bindActions as bindActionsKids, loadNfts } from './nftKids'
import { initReact } from './react'

export async function initialize(project = 'nftKids') {
  switch (project) {
    case 'nftKids':
      // initReact()
      bindActionsKids()
      initializeMoralis()
      // checkIfAlreadyConnected()
      loadNfts()
      break

    case 'mintSite':
      setupHtmlForThree()
      runScene()
      bindActionsThree()
      initializeMoralis()
      // checkIfAlreadyConnected().then(getNFTDropsOwnedByUser)
      // getMarketListings()
      populatePopupWithDropInfo()
      break

    default:
      break
  }
}

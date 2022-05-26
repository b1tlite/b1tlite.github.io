import { runScene } from '../three/three-lib'

function setupHtmlForThree() {
  // wrap
  const { body } = document
  // const oldHtml = body.innerHTML
  // body.innerHTML = '<main>' + oldHtml + '</main>'

  // setup main style
  const main = document.querySelector('main')
  main.style = 'position: absolute; position: absolute; width: 100%; z-index: 10;'

  // add bg
  const canvas = document.createElement('canvas')
  canvas.style = 'position: fixed; top: 0; left: 0;'
  canvas.id = 'bg'
  body.append(canvas)
}

function bindActions() {
  const connectButton = document.querySelector('.connect-button')
  connectButton.onclick = window.sen.web3.connect

  const mintButton = document.querySelector('.mint-button')
  mintButton.onclick = () => {
    window.sen.web3.mintNFTFromDrop(1)
  }

  // window.addEventListener(
  //   'onWalletAuthenticated',
  //   (e) => {
  //     openPopup()
  //   },
  //   false
  // )
  window.addEventListener(
    'onWeb3Enabled',
    (e) => {
      openPopup()
    },
    false
  )
  // window.addEventListener(
  //   'onWeb3Enabled',
  //   (e) => {
  //     connectButton.innerHTML = `Disconnect`
  //     // connectButton.innerHTML = `Connected as ${account}`
  //     connectButton.onclick = window.sen.web3.disconnect
  //   },
  //   false
  // )
  window.addEventListener(
    'onWeb3Deactivated',
    (e) => {
      connectButton.innerHTML = 'Connect'
      connectButton.onclick = window.sen.web3.connect
    },
    false
  )
}

function openPopup() {
  return document.querySelector('.open-popup').click()
}

function populatePopupWithDropInfo() {
  return window.sen.web3.getNFTDropInfo().then(({ totalSupply, totalUnclaimedSupply, claimConditions }) => {
    document.querySelector('.items-count').innerHTML = `${totalUnclaimedSupply}/${totalSupply}`
    const {
      currencyMetadata: { displayValue, name },
    } = claimConditions
    document.querySelector('.price').innerHTML = `${displayValue} ${name}`
  })
}

export function initialize() {
  setupHtmlForThree()
  runScene()
  bindActions()
  // getMarketListings()
  populatePopupWithDropInfo()
}

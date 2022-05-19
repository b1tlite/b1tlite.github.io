import {
  bindOnWeb33Deactivated,
  bindOnWeb3Enabled,
  checkAndFixNetwork,
  connect,
  disconnect,
  mintNFTFromDrop,
} from '../web3Api'

export function setupHtmlForThree() {
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

function handleConnectClick() {
  return connect().then(openPopup).catch(console.error)
}

export function bindActions() {
  const connectButton = document.querySelector('.connect-button')
  connectButton.onclick = handleConnectClick

  const mintButton = document.querySelector('.mint-button')
  mintButton.onclick = () => {
    mintNFTFromDrop(1)
  }

  bindOnWeb3Enabled((result) => {
    connectButton.innerHTML = `Disconnect`
    // connectButton.innerHTML = `Connected as ${account}`
    connectButton.onclick = disconnect
  })
  bindOnWeb33Deactivated((result) => {
    connectButton.innerHTML = 'Connect'
    connectButton.onclick = handleConnectClick
  })
}

function openPopup() {
  return document.querySelector('.open-popup').click()
}

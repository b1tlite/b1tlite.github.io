import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
// import Moralis from 'moralis/types'
import Moralis from 'moralis/dist/moralis.min.js'

async function enableWeb3() {
  if (!Moralis.isWeb3Enabled()) {
    console.log('Connecting')
    await Moralis.enableWeb3()
    console.log('Connected')
  } else {
    console.log('Already connected')
  }
}
function onMetamuskNotInstalled() {}

function isAlreadyConnected() {
  return new Promise((res, rej) => {
    if (!window.ethereum) {
      console.error('Install metamusk!')
      onMetamuskNotInstalled && onMetamuskNotInstalled()
      res()
    }
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        res(accounts.length === 0)
      })
      .catch(rej)
  })
}
function checkIfAlreadyConnected() {
  isAlreadyConnected().then((isConnected) => {
    if (isConnected) return Moralis.enableWeb3()
  })
}
async function disableWeb3() {
  await Moralis.deactivateWeb3()
  console.log('logged out')
}

export async function init() {
  initializeMoralis()
  bindActions()
  checkIfAlreadyConnected()
  loadNfts()
}

function initializeMoralis() {
  const serverUrl = 'https://6hiqo5aptzjt.usemoralis.com:2053/server' //Server url from moralis.io
  const appId = '4tLI25e1VFuYR6InpKuVqIp4T6zXSa8pHmrh0BBz' // Application id from moralis.io
  Moralis.start({ serverUrl, appId })
}

function bindActions() {
  const connectButton = document.getElementById('connect')
  connectButton.onclick = enableWeb3

  // Subscribe to onWeb3Enabled events
  const unsubscribe = Moralis.onWeb3Enabled((result) => {
    const { account } = result
    connectButton.innerHTML = `Connected as ${account}`
    connectButton.onclick = disableWeb3
    console.log(result)
  })
  const unsubscribe2 = Moralis.onWeb3Deactivated((result) => {
    connectButton.innerHTML = 'Connect'
    connectButton.onclick = enableWeb3
    console.log(result)
  })
}

function prepareGrid() {
  const grid = document.getElementById('nft-grid')
  const mockItem = document.getElementById('nft-item-moc')
  // clear exact column classes
  const firstClass = mockItem.classList[0]
  mockItem.classList.remove(...mockItem.classList)
  mockItem.classList.add(firstClass)
  // clear grid
  grid.innerHTML = ''
  return { grid, mockItem }
}

function getMarketplace(sdk) {
  return sdk.getMarketplace('0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9')
}

export function loadNfts() {
  // get moc item
  // remove it from from gid
  // display loader ??
  // prepare moc
  const { grid, mockItem } = prepareGrid()

  getProvider(true) // readonly provider
    .then(getSdk)
    .then(getMarketplace)
    .then((marketplace) => marketplace.getActiveListings())
    .then((listings) => listings.filter((el) => el.quantity.toNumber() > 0))
    .then((listings) => {
      console.log('Current listings', listings)
      displayNfts(listings, grid, mockItem)
    })
    .catch(console.error)
}

function getSdk(provider) {
  return new Promise((res, rej) => {
    res(new ThirdwebSDK(provider))
  })
}

function getProvider(isReadOnly = false) {
  return new Promise((res, rej) => {
    if (isReadOnly) {
      const NODE_URL =
        'https://speedy-nodes-nyc.moralis.io/9fe8dc8cf64177599a32cb80/polygon/mainnet'
      res(new ethers.providers.JsonRpcProvider(NODE_URL))
    } else {
      // signer
      Moralis.enableWeb3().then(res).catch(rej)
    }
  })
}

function displayNfts(nfts, grid, mockItem) {
  const nodes = nfts.map((nft, index) => {
    const { asset, quantity, buyoutCurrencyValuePerToken, id: listingId } = nft
    const { name, description, image, properties } = asset

    const item = mockItem.cloneNode(true)
    item.display = 'block'
    item.id = `nft-${index}`
    item.setAttribute('listing-id', listingId)
    item.setAttribute('asset-max-quantity', quantity.toNumber())

    const img = item.querySelector('img')
    const head = item.querySelector('h3')
    const desc = item.querySelector('.paragraph-light')
    const buyBtn = item.querySelector('#buy-btn')
    buyBtn.onclick = (e) => {
      e.preventDefault()
      getProvider()
        .then(getSdk)
        .then(getMarketplace)
        .then((marketplace) => marketplace.direct.buyoutListing(listingId, 1))
        .catch(console.error)
        .then(loadNfts)
    }
    img.src = image
    head.innerHTML = name
    desc.innerHTML = `${description} ${quantity} ${Object.values(
      properties
    ).join(', ')}`
    return item
  })
  grid.append(...nodes)
}

// description: "Monetize personal data to earn passive income with SoT-Income Inc. \nSystem on tooth(SoT) is an autonomus computer embedded within a tooth, which uses Bluetooth, sensors and wireless power transfer to allow wireless communication. On the SoT are integrated microphone and bone conduction module that allow for two-way communication, as well as sensors that detect activities such as chewing, drinking, speaking, coughing, what food is eaten, and how often the user brushes his/her teeth."
// id: BigNumber {_hex: '0x0e', _isBigNumber: true}
// image: "https://gateway.ipfscdn.io/ipfs/QmcyKGgQ4n7SN49T6eFyfEjcoHJxJ2YJUTKFS1ibN1sNj6/14"
// name: "SoT-15"
// properties:
//  author: "Speculative Intelligence"
// uri: "ipfs://QmcTzUq5k2q8gGrgg44dPprW6QcJsMEDy6g2cziYYyMY17/14"

// asset: {name: 'SoT-15', description: 'Monetize personal data to earn passive income with…en, and how often the user brushes his/her teeth.',
//  image: 'https://gateway.ipfscdn.io/ipfs/QmcyKGgQ4n7SN49T6eFyfEjcoHJxJ2YJUTKFS1ibN1sNj6/14', id: BigNumber,
// uri: 'ipfs://QmcTzUq5k2q8gGrgg44dPprW6QcJsMEDy6g2cziYYyMY17/14', …}
// assetContractAddress: "0x5425fC8BF42501386C9920B3a7044ACB700278ee"
// buyoutCurrencyValuePerToken: {name: 'Matic', symbol: 'MATIC', decimals: 18, value: BigNumber, displayValue: '3.0'}
// buyoutPrice: BigNumber {_hex: '0x29a2241af62c0000', _isBigNumber: true}
// currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
// id: "0"
// quantity: BigNumber {_hex: '0x01', _isBigNumber: true}
// secondsUntilEnd: BigNumber {_hex: '0x011e58472e', _isBigNumber: true}
// sellerAddress: "0x24CF215F975B23b92fB2d9cE202A38A41eD3Df74"
// startTimeInSeconds: BigNumber {_hex: '0x6260292e', _isBigNumber: true}
// tokenId: BigNumber {_hex: '0x0e', _isBigNumber: true}
// type: 0

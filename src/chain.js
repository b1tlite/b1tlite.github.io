import { ThirdwebSDK } from '@thirdweb-dev/sdk'
// import Moralis from 'moralis/types'
import Moralis from 'moralis/dist/moralis.min.js'
async function login() {
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
async function logOut() {
  await Moralis.User.logOut()
  console.log('logged out')
}

export async function init() {
  initializeMoralis()
  bindActions()
  checkIfAlreadyConnected()
  // loadNfts()
}

function initializeMoralis() {
  const serverUrl = 'https://6hiqo5aptzjt.usemoralis.com:2053/server' //Server url from moralis.io
  const appId = '4tLI25e1VFuYR6InpKuVqIp4T6zXSa8pHmrh0BBz' // Application id from moralis.io
  Moralis.start({ serverUrl, appId })
}

function bindActions() {
  document.getElementById('connect').onclick = login
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

export function loadNfts() {
  // get moc item
  // remove it from from gid
  // display loader ??
  // prepare moc
  const { grid, mockItem } = prepareGrid()

  getProvider()
    .then((provider) => getSdk(provider))
    .then((sdk) =>
      sdk.getMarketplace('0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9')
    )
    .then((marketplace) => marketplace.getActiveListings())
    .then((listings) => {
      console.log('Current listings', listings)
      displayNfts(listings, grid, mockItem)
    })
    .catch(console.error)
}

function getSdk(provider) {
  return new Promise((res, rej) => {
    if (window.thirwebSdk) {
      res(window.thirwebSdk)
    } else {
      window.thirwebSdk = new ThirdwebSDK(provider)
      res(window.thirwebSdk)
    }
  })
}

function getProvider() {
  return new Promise((res, rej) => {
    if (window.provider) {
      res(window.provider)
    } else {
      Moralis.enableWeb3()
        .then((result) => {
          window.provider = result
          res(window.provider)
        })
        .catch(rej)
    }
  })
}

function displayNfts(nfts, grid, mockItem) {
  const nodes = nfts.map((nft, index) => {
    const { asset, quantity, buyoutCurrencyValuePerToken } = nft
    const { name, description, image, properties } = asset

    const item = mockItem.cloneNode(true)
    item.display = 'block'
    item.id = `nft-${index}`
    const img = item.querySelector('img')
    const head = item.querySelector('h3')
    const desc = item.querySelector('.paragraph-light')
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

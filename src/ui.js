// import Moralis from 'moralis/types'
import Moralis from 'moralis/dist/moralis.min.js'
import { initializeMoralis, checkIfAlreadyConnected, enableWeb3, disableWeb3, getNfts, buyNft } from './web3Api'

export async function initialize() {
  initializeMoralis()
  bindActions()
  checkIfAlreadyConnected()
  loadNfts()
}

const ITEMS_PER_PAGE = 6
const ITEMS_PER_ROW = 3
let currentMaxItemsToDisplay = ITEMS_PER_PAGE
///////////////////////////////////
///////////////////////////////////
// UI
function hideLoadMoreButton() {
  const loadmoreButton = document.querySelector('.loadmorebuttontext ')
  loadmoreButton.display = 'none'
}
function addNftsToUI(nfts, uiElements) {
  const { container, row, item } = uiElements

  // max 6 for first time display
  nfts = nfts.slice(0, currentMaxItemsToDisplay)

  const nftElements = nfts.map((nft, index) => prepareNftItemElement(nft, item, index))

  // clear container
  container.innerHTML = ''

  const rowsCount = Math.ceil(nftElements.length / ITEMS_PER_ROW)
  for (let rowNumber = 0; rowNumber < rowsCount; rowNumber++) {
    const nftRow = row.cloneNode(true)
    for (let itemNumber = 0; itemNumber < ITEMS_PER_ROW; itemNumber++) {
      const nftElement = nftElements[rowNumber * ITEMS_PER_ROW + itemNumber]
      nftElement && nftRow.append(nftElement)
    }
    container.append(nftRow)
  }
}
function prepareNftItemElement(nft, mockItem, index) {
  // return mockItem
  const { asset, quantity, buyoutCurrencyValuePerToken, id: listingId } = nft
  const { name, description, image, properties } = asset

  const item = mockItem.cloneNode(true)
  // item.display = 'block'
  // item.id = `nft-${index}`
  // item.setAttribute('listing-id', listingId)
  // item.setAttribute('asset-max-quantity', quantity.toNumber())

  const img = item.querySelector('img')
  const head = item.querySelector('.nftitemheader')
  const location = item.querySelector('.nftitemlocation > .text-block')
  // const desc = item.querySelector('.paragraph-light')
  const buyBtn = item.querySelector('.nftitembutton')
  buyBtn.onclick = (e) => {
    handleBuyClick(e, listingId, 1)
  }

  // replace image
  const newImage = document.createElement('img');
  newImage.src = image
  newImage.classList = img.classList
  img.parentNode.replaceChild(newImage, img);


  head.innerHTML = `${capitalizeFirstLetter(properties.author || 'Uknown author')}, ${
    properties.age || 'unknown'
  } years old`
  location.innerHTML = `${capitalizeFirstLetter(properties.location || properties.city || 'Uknown')}`
  // desc.innerHTML = `${description} ${quantity} ${Object.values(properties).join(', ')}`
  return item
}
function prepareContainer(uiElements) {
  const { container, row, item } = uiElements
  // // clear exact column classes
  // const firstClass = mockItem.classList[0]
  // mockItem.classList.remove(...mockItem.classList)
  // mockItem.classList.add(firstClass)
  // // clear grid
  // container.innerHTML = ''
  // // mockItem.display = 'none'
  return uiElements
}
export function onMetamuskNotInstalled() {}
function hideLoader(nfts) {
  return nfts
}
function showGrid(nfts) {
  return nfts
}
function setButtonsLoading(state = true) {}

///////////////////////////////////
///////////////////////////////////
// handlers
function handleBuyClick(e, listingId, quntity = 1) {
  e.preventDefault()
  setButtonsLoading(true)
  buyNft(listingId, quntity)
    .catch(console.error)
    .then(loadNfts)
    .then(saveNFTSToStore)
    .then(() => setButtonsLoading(false))
    .catch(console.error)
}
function handleLoadMore(e) {
  currentMaxItemsToDisplay += ITEMS_PER_PAGE
  const nfts = getSavedNFTS()
  if (nfts.length <= currentMaxItemsToDisplay) {
    hideLoadMoreButton()
  }
}
function loadNfts() {
  // get moc item
  // remove it from from gid
  // display loader ??
  // prepare moc
  const uiElements = getUIElements()
  // const { container, row, item } = uiElements
  prepareContainer(uiElements)

  getNfts()
    .then((nfts) => {
      console.log('Current nfts', nfts)
      addNftsToUI(nfts, uiElements)
      return nfts
    })
    .then(hideLoader)
    .then((nfts) => {
      if (nfts.length <= currentMaxItemsToDisplay) {
        hideLoadMoreButton()
      }
      return nfts
    })
    .then(showGrid)
    .catch(console.error)
}

///////////////////////////////////
///////////////////////////////////
// UTILS
function getSavedNFTS() {
  return window.nfts || []
}
function saveNFTSToStore(nfts) {
  window.nfts = nfts
  return nfts
}
function getUIElements() {
  window.mockElements = window.mockElements || {}

  window.mockElements.container = window.mockElements.container || document.querySelector('.nftgallery')

  window.mockElements.row =
    window.mockElements.row || window.mockElements.container.querySelector('.galleryrow').cloneNode(true)

  window.mockElements.item =
    window.mockElements.item || window.mockElements.row.querySelector('.nftitem').cloneNode(true)

  window.mockElements.row.innerHTML = ''

  return { container: window.mockElements.container, row: window.mockElements.row, item: window.mockElements.item }
}
function bindActions() {
  const connectButton = document.querySelector('.connectwalletbutton ')
  connectButton.onclick = enableWeb3

  const loadmoreButton = document.querySelector('.loadmorebuttontext ')
  loadmoreButton.onclick = handleLoadMore

  // Subscribe to onWeb3Enabled events
  const unsubscribe = Moralis.onWeb3Enabled((result) => {
    const { account } = result
    connectButton.innerHTML = `Disconnect`
    // connectButton.innerHTML = `Connected as ${account}`
    connectButton.onclick = disableWeb3
    console.log(result)
  })
  const unsubscribe2 = Moralis.onWeb3Deactivated((result) => {
    connectButton.innerHTML = 'Connect'
    connectButton.onclick = enableWeb3
    console.log(result)
  })
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
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

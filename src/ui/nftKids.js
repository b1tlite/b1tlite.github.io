import Moralis from 'moralis/dist/moralis.min.js'
import { enableWeb3, disableWeb3, getMarketListings, buyNft, bindOnWeb3Enabled, bindOnWeb33Deactivated } from '../web3Api'
import { capitalizeFirstLetter } from './utils'

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
  const newImage = document.createElement('img')
  newImage.src = image
  newImage.classList = img.classList
  img.parentNode.replaceChild(newImage, img)

  head.innerHTML = `${capitalizeFirstLetter(properties.author || 'Unknown author')}, ${
    properties.age || 'unknown'
  } years old`
  location.innerHTML = `${capitalizeFirstLetter(properties.location || properties.city || 'Unknown')}`
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
export function loadNfts() {
  // get moc item
  // remove it from from gid
  // display loader ??
  // prepare moc
  const uiElements = getUIElements()
  // const { container, row, item } = uiElements
  prepareContainer(uiElements)

  getMarketListings()
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
export function bindActions() {
  const connectButton = document.querySelector('.connectwalletbutton ')
  const connectButtontext = document.querySelector('.headerbuttontext')
  connectButton.onclick = enableWeb3

  const loadmoreButton = document.querySelector('.loadmorebuttontext ')
  loadmoreButton.onclick = handleLoadMore

  // Subscribe to onWeb3Enabled events
  bindOnWeb3Enabled((result) => {
    connectButtontext.innerHTML = `Disconnect wallet`
    // connectButton.innerHTML = `Connected as ${account}`
    connectButton.onclick = disableWeb3
  })
  bindOnWeb33Deactivated((result) => {
    connectButtontext.innerHTML = 'Connect wallet'
    connectButton.onclick = enableWeb3
  })
}

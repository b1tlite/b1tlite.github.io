import { capitalizeFirstLetter } from '../code/utils'

const ITEMS_PER_PAGE = 6
const ITEMS_PER_ROW = 3
let currentMaxItemsToDisplay = ITEMS_PER_PAGE

function hideLoadMoreButton() {
  const loadmoreButton = getLoadMoreButton()
  loadmoreButton.style.display = 'none'
}
function getLoadMoreButton() {
  return document.querySelector('.loadmorebutton')
}

function addNftsToUI(nfts) {
  const { container, row, item } = getUIElements()

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

function hideLoader(nfts) {
  document.querySelector('.nftloader').style.display = 'none'
  return nfts
}
function showNftGallery(nfts) {
  const { container } = getUIElements()
  container.style.display = 'flex'
  return nfts
}
function setButtonsLoading(state = true) {}
///////////////////////////////////
///////////////////////////////////
// handlers
function handleBuyClick(e, listingId, quntity = 1) {
  e.preventDefault()
  setButtonsLoading(true)
  window.sen.web3
    .buyNft(listingId, quntity)
    .then(loadNftsToUI)
    .then(saveNFTSToStore)
    .then(() => setButtonsLoading(false))
}
function handleLoadMore(e) {
  currentMaxItemsToDisplay += ITEMS_PER_PAGE
  const nfts = getSavedNFTS()
  checkIfShouldHideLoadMore(nfts)
  addNftsToUI(nfts)
}

function checkIfShouldHideLoadMore(nfts) {
  if (nfts.length <= currentMaxItemsToDisplay) {
    hideLoadMoreButton()
  }
  return nfts
}

function loadNftsToUI() {
  return window.sen.web3
    .getMarketListings()
    .then((listings) => {
      console.log('Current listings', listings)
      addNftsToUI(listings)
      return listings
    })
    .then(hideLoader)
    .then(checkIfShouldHideLoadMore)
    .then(showNftGallery)
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
  const connectButton = document.querySelector('.connectwalletbutton')
  const connectButtontext = document.querySelector('.headerbuttontext')
  connectButton.onclick = window.sen.web3.connect

  // const loadmoreButton = getLoadMoreButton()
  // loadmoreButton.onclick = disconnect

  // Subscribe to onWeb3Enabled events
  window.addEventListener('onWalletAuthenticated', (e) => {
    connectButtontext.innerHTML = `Disconnect wallet`
    // connectButton.innerHTML = `Connected as ${account}`
    connectButton.onclick = window.sen.web3.disconnect
  })
  // window.addEventListener(
  //   'onWeb3Enabled',
  //   (e) => {
  //     connectButtontext.innerHTML = `Disconnect wallet`
  //     // connectButton.innerHTML = `Connected as ${account}`
  //     connectButton.onclick = window.sen.web3.disconnect
  //   },
  //   false
  // )

  window.addEventListener('onWeb3Deactivated', (e) => {
    connectButtontext.innerHTML = 'Connect wallet'
    connectButton.onclick = window.sen.web3.connect
  })
}

export function initialize() {
  bindActions()
  loadNftsToUI()
}

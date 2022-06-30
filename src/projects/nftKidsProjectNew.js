const apiEndpoint = 'https://kids-nft-dashboard.herokuapp.com/api'

function getUploads() {
  const url = `${apiEndpoint}/uploads`
  return fetch(url).then((response) => response.json())
  // .then((data) => console.log(data))
}
function bindActions(page) {
  console.log('Page', page)
  switch (page) {
    case 'nft-collection':
      // bindOnMoreButtons()
      break
    case 'home':
      // bindOnMoreButtons()
      break
    case 'nft-item':
      bindBuyButton()
      break
    default:
      console.log('wrong page', page)
      break
  }
}
function bindBuyButton() {
  const buyBtn = document.querySelector('.buy-now-button')
  const href = buyBtn.getAttribute('href')
  buyBtn.removeAttribute('href')
  const checkoutId = href.split('//').pop()
  buyBtn.addEventListener('click', () => {
    console.log('checkId click', checkoutId)
    window.sen.web3.buyPaperNft(checkoutId)
  })
}

function bindOnMoreButtons() {
  return getUploads()
    .then((uploads) => {
      console.log('Got uploads', uploads)
      return uploads || []
    })
    .then((uploads) =>
      uploads.filter(
        (upload) =>
          upload &&
          !upload.isSoldOut &&
          upload.isMinted &&
          upload.isListed &&
          upload.isPaperCheckoutCreated &&
          upload.paperInfo &&
          upload.paperInfo.checkoutId
      )
    )
    .then((uploads) => {
      console.log('Filter uploads', uploads)
      return uploads
    })
    .then((uploads) => {
      if (!uploads || !uploads.length) {
        console.log('No uploads')
        return
      }
      const moreButtons = document.querySelectorAll('.collection-item .collection-item-details a.sticker')
      let counter = 0
      console.log('Got moreButtons', moreButtons)
      moreButtons.forEach((button) => {
        const upload = uploads[moreButtons.length % counter]
        counter++
        if (!upload) {
          console.log('Strange error', upload)
          return
        }
        console.log('checkId bind', upload.paperInfo.checkoutId)
        button.addEventListener('click', () => {
          console.log('checkId click', upload.paperInfo.checkoutId)
          window.sen.web3.buyPaperNft(upload.paperInfo.checkoutId)
        })
      })
    })
}

export function initialize(page) {
  bindActions(page)
}

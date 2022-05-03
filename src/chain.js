import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Moralis from 'moralis/dist/moralis.min.js'

async function login() {
  console.error('gggggg')
  let user = Moralis.User.current()
  if (!user) {
    user = await Moralis.authenticate()
  }
  console.log('logged in user:', user)
}

async function logOut() {
  await Moralis.User.logOut()
  console.log('logged out')
}

export async function init() {
  const serverUrl = 'https://6hiqo5aptzjt.usemoralis.com:2053/server' //Server url from moralis.io
  const appId = '4tLI25e1VFuYR6InpKuVqIp4T6zXSa8pHmrh0BBz' // Application id from moralis.io
  Moralis.start({ serverUrl, appId })
  // add from here down

  const provider = await Moralis.enableWeb3()
  const sdk = new ThirdwebSDK(provider)
  const marketplace = sdk.getMarketplace(
    '0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9'
  )
  marketplace
    .getActiveListings()
    .then((listings) => {
      console.log('Current listings', listings)
      displayNfts(listings)
    })
    .catch(console.error)

  document.getElementById('connect').onclick = login
}

function displayNfts(nfts) {
  const grid = document.getElementById('nft-grid')
  const mokItem = document.getElementById('nft-item-moc')
  grid.innerHTML = ''

  nfts.forEach((nft) => {
    const { asset, quantity, buyoutCurrencyValuePerToken } = nft
    const { name, description, image, properties } = asset

    const item = mokItem.cloneNode(true)
    item.display = 'block'
    const img = item.querySelector('img')
    const head = item.querySelector('h3')
    const desc = item.querySelector('.paragraph-light')
    img.src = image
    head.innerHTML = name
    desc.innerHTML = `${description} ${quantity} ${Object.values(
      properties
    ).join(', ')}`
    grid.appendChild(item)
  })
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

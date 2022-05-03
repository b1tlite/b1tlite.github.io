// my_script.ts
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Moralis from 'moralis/dist/moralis.min.js'

// // access your deployed contracts
// const nftDrop = sdk.getNFTDrop('0x...')
// const marketplace = sdk.getMarketplace('0x...')

// // Read from your contracts
// const claimedNFTs = await nftDrop.getAllClaimed()
// const listings = await marketplace.getActiveListings()

export function connect() {
  const serverUrl = 'https://6hiqo5aptzjt.usemoralis.com:2053/server' //Server url from moralis.io
  const appId = '4tLI25e1VFuYR6InpKuVqIp4T6zXSa8pHmrh0BBz' // Application id from moralis.io
  Moralis.start({ serverUrl, appId })
  console.error('aaaaaaa')
  // add from here down
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
  //const web3Provider = await Moralis.enableWeb3();
  const provider = ethers.Wallet.createRandom()
  const sdk = new ThirdwebSDK(provider)
  const marketplace = sdk.getMarketplace(
    '0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9'
  )
  marketplace.getActiveListings().then((listings) => {
    console.log('Current listings', listings)
  })

  document.getElementById('connect').onclick = login
}

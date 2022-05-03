import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import Moralis from 'moralis/dist/moralis.min.js'

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
    const provider = await Moralis.enableWeb3()
    const sdk = new ThirdwebSDK(provider)
    const marketplace = sdk.getMarketplace(
      '0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9'
    )
    console.log('bbbbbbbb')
    marketplace.getActiveListings().then((listings) => {
      console.log('Current listings', listings)
    })
  }

  // async function logOut() {
  //   await Moralis.User.logOut()
  //   console.log('logged out')
  // }

  document.getElementById('connect').onclick = login
}

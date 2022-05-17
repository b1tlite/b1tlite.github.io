const sen = {
  initialize, // (projectName = 'nftKids') => Promise used for html sites to initialize and bind proper actions
  web3: {
    isUserOwnsSomeNfts, // Promise => returns bool if user has some nfts from collection (only after wallet is connected)
    connect, // Promise => send request to connect user wallet
    disconnect, // Promise =>
    getNfts, // Promise => [nftItem] returns nft listings from market
    buyNft, // Promise (int/string: listingId <nft.id>, int: countNftsToBuy <from quantity> ) => null (only after wallet is connected)
    getNFTsOwnedByUser, // Promise => [nftItem] returns nfts owned by user in our collection
    getCurrentUserAddress, // returns current user account address
    getCurrentUserChain, // returns chainId
  },
  three: {
    // used for another project
    runScene, // wraps body content in block and add background with three.js canvas
  },
}

// window.senState - internal state object
// const { ethers, Moralis, ThirdwebSDK, isMoralisStared } = window.senState

// called after connect succeed
window.addEventListener(
  'onWeb3Enabled',
  (e) => {
    const { detail } = e
    const { account, chainId, connector, web3, provider } = detail

    // your code
  },
  false
)

// called after disconnect succeed
window.addEventListener(
  'onWeb3Deactivated',
  (e) => {
    const { detail } = e
    const result = detail
    // your code
  },
  false
)

// called after account changed
window.addEventListener(
  'onAccountChanged',
  (e) => {
    const { detail } = e
    const account = detail
    // your code
  },
  false
)

// called after chain changed
window.addEventListener(
  'onChainChanged',
  (e) => {
    const { detail } = e
    const chainId = detail
    // your code
  },
  false
)

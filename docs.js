const lib = {
  init, // deprecated
  getNfts, // deprecated
  initialize, // used for another project
  web3: {
    isUserOwnsSomeNfts, // Promise => returns bool if user has some nfts from collection (only after wallet is connected)
    connect, // Promise => send request to connect user wallet
    disconnect, // Promise =>
    getNfts, // Promise => [nftItem] returns nft listings from market
    buyNft, // Promise (int/string: listingId <nft.id>, int: countNftsToBuy <from quantity> ) => null (only after wallet is connected)
    getNFTsOwnedByUser, // Promise => [nftItem] returns nfts owned by user in our collection
  },
}

// called after connect succeed
window.addEventListener(
  'onWeb3Enabled',
  (e) => {
    const { detail } = e
    // your code
  },
  false
)

// called after disconnect succeed
window.addEventListener(
  'onWeb3Deactivated',
  (e) => {
    const { detail } = e
    // your code
  },
  false
)

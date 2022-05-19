const sen = {
  initialize, // (projectName = 'nftKids') => Promise used for html sites to initialize and bind proper actions
  web3: {
    isUserOwnsSomeNfts, // Promise => returns bool if user has some nfts from collection (only after wallet is connected)
    connect, // Promise => send request to connect user wallet
    disconnect, // Promise =>
    getEditionNfts, // Promise => returns all [editiontNft] from edition
    getMarketListings, // getNfts // I'm going to deprecate 'getNfts' so it will be more clear
    getNfts, // [going to be depracated] (onlyAvaliable = true) => Promise => [marketListing] returns nft listings from market
    // It now has (onlyAvaliable = true) argument by default,
    // but u can pass 'false' to get all items and filter it by yourself
    // It now also adds additinal fields for all [marketListing] for filter purposes
    // marketListing: {
    //  startedAt, -> toDateTime(el.startTimeInSeconds)
    //  endsAt, -> toDateTime(endDateInseconds) // startSeconds + duration
    //  isEnded, -> endDateInseconds > new Date().getSeconds()
    //  soldOut, bool -> el.quantity.toNumber() < 1
    //  isAvaliable, bool -> !el.soldOut && !el.isEnded
    // }

    buyNft, // Promise (int/string: listingId <nft.id>, int: countNftsToBuy <from quantity> ) => null (only after wallet is connected)
    getNFTsOwnedByUser, // Promise => [editiontNft] returns nfts owned by user in our collection
    getCurrentUserAddress, // returns current user account address
    getCurrentUserChain, // returns chainId
    mintNFTFromDrop, // (quantity = 1) => Promise => 
    //@returns - an array of results containing the id of the token claimed, the transaction receipt and a promise to optionally fetch the nft metadata
    getNFTDropInfo, // Promise => { totalSupply, totalUnclaimedSupply }
    getNFTDropsOwnedByUser, // Promise => [nftDrop] // returns users 'inventory' from drop // needs connected wallet
  },
  three: {
    // used for another project
    runScene, // adds canvas to body and changing <main> styles to absolute to add background
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

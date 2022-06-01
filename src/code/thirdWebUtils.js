import { ThirdwebSDK } from '@thirdweb-dev/sdk'

export async function getTWSdk(provider) {
  return new ThirdwebSDK((provider.getSigner && provider.getSigner()) || provider)
}
export async function getTWMarketplace(sdk) {
  return sdk.getMarketplace('0x04a31816384b785e2DF58Ff706fDDBf160bF1DA9') // my
}
export async function getTWEdition(sdk) {
  return sdk.getEdition('0x5425fC8BF42501386C9920B3a7044ACB700278ee') // kirill
}
export async function getTWNFTDrop(sdk) {
  return sdk.getNFTDrop('0x54B50e5bFFf2adA3748b6F7004dE6761fC2E89D0') // my
}

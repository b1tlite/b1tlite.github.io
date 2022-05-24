export function catchWalletOperationErrors(err) {
  console.error(err)
  if (err?.reason?.includes('insufficient funds')) {
    window.sen.notifier.warning('No enought funds in your wallet!')
  } else if (err) {
    window.sen.notifier.warning('Unknown error occured, check console for more.')
    throw new Error(err)
  }
}

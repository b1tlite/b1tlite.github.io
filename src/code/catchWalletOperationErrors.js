export function catchWalletOperationErrors(err) {
  console.error(err)
  if (err?.reason?.includes('insufficient funds')) {
    window.sen.notifier.warning('No enought funds in your wallet!')
  } else if (err?.message == 'Connect wallet first!') {
    window.sen.notifier.warning('Connect wallet first!')
  } else if (err) {
    window.sen.notifier.warning('Unknown error occured, check console for more.' + JSON.stringify(err))
    throw new Error(err)
  }
}

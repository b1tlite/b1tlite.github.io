import { initReact } from './react'
import * as Sentry from '@sentry/browser'
import { BrowserTracing } from '@sentry/tracing'
import { CaptureConsole } from '@sentry/integrations'

const funcs = [
  'connect',
  'disconnect',
  'getMarketListings',
  'buyNft',
  'getEditionNftsOwnedByUser',
  'getCurrentUserAddress',
  'getCurrentUserChain',
  'getEditionNfts',
  'getNFTDropInfo',
  'getNFTDropsOwnedByUser',
  'mintNFTFromDrop',
  'initialize',
]

/////////////////
// call to get state objects
// and create all functions in window.senInner
try {
  window.onload = function () {
    initReact()
  }

  Sentry.init({
    dsn: 'https://60faa44ac9024414927e9905b8ff6046@o1262208.ingest.sentry.io/6440773',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    maxBreadcrumbs: 40,
    debug: true,
    tracesSampleRate: 1.0,
    release: '1',
    integrations: [
      new CaptureConsole({
        levels: ['log', 'info', 'warn', 'error', 'debug', 'assert'],
      }),
    ],
  })
} catch (err) {
  console.error(err)
}
/////////
const web3 = {}
funcs.forEach((funcName) => {
  web3[funcName] = function () {
    const incomingArgs = arguments
    function execute() {
      if (!window.senInner) {
        throw new Error('No senInner. Inner lib error.')
      }
      if (!window.senInner[funcName]) {
        throw new Error('No window.senInner[funcName]. Inner lib error.', funcName)
      }

      console.log('Called from index:', funcName, incomingArgs)
      return window.senInner[funcName].apply(null, incomingArgs)
    }
    const isReady = window.senInner && window.senInner[funcName]
    if (!isReady) {
      return new Promise((res, rej) => {
        window.addEventListener(
          'onSenReady',
          () => {
            res(execute())
          },
          false
        )
      })
    }
    return execute()
  }
})

const initialize = web3.initialize

if (window) {
  window.sen = window.sen || { web3, initialize }
}

export { web3, initialize }

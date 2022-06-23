import { PaperSDKProvider } from '@paperxyz/react-client-sdk'
import React from 'react'
import { MoralisProvider } from 'react-moralis'

import { App } from './App'

export function AppWrapper() {
  return (
    <>
      <PaperSDKProvider
        // Required: string
        chainName="Mumbai"
      >
        <MoralisProvider
          serverUrl="https://6hiqo5aptzjt.usemoralis.com:2053/server"
          appId="4tLI25e1VFuYR6InpKuVqIp4T6zXSa8pHmrh0BBz"
        >
          <App />
        </MoralisProvider>
      </PaperSDKProvider>
    </>
  )
}

import React from 'react'
import { createRoot } from 'react-dom/client'
import { MoralisProvider } from 'react-moralis'
import { ConnectButton, WalletModal } from 'web3uikit'
function createRootElement(id, isHidden) {
  const root = document.createElement('div')
  root.id = id
  if (isHidden) root.style.display = 'none'
  document.body.append(root)
  return root
}
export function initReact(isHidden = true) {
  const component = document.querySelector('#react') || createRootElement('react', isHidden)
  const root = createRoot(component)

  root.render(
    <React.StrictMode>
      <MoralisProvider
        serverUrl="https://6hiqo5aptzjt.usemoralis.com:2053/server"
        appId="4tLI25e1VFuYR6InpKuVqIp4T6zXSa8pHmrh0BBz"
      >
        <App />
      </MoralisProvider>
    </React.StrictMode>
  )
}

function App() {
  return (
    <>
      <WalletModal isOpened setIsOpened={function noRefCheck() {}} />
      <ConnectButton />
    </>
  )
}

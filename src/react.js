import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './components/App'
import { getRootElement } from './utils'

export function initReact(isHidden = true) {
  const component = getRootElement('react', isHidden)
  const root = createRoot(component)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

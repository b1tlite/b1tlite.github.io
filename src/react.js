import React from 'react'
import { createRoot } from 'react-dom/client'

import { getRootElement } from './code/utils'
import { AppWrapper } from './components/AppWrapper'

export function initReact(isHidden = true) {
  const component = getRootElement('react', isHidden)
  const root = createRoot(component)
  root.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  )
}

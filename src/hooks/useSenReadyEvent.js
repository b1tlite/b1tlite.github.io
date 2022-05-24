import { useState, useEffect } from 'react'

export function useSenReadyEvent() {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (!isReady && window.senInner) {
      window.dispatchEvent(new CustomEvent('onSenReady'))
      setIsReady(true)
    }
  }, [isReady])
}

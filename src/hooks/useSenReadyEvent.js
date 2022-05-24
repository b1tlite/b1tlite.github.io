import { useState, useEffect } from 'react'

export function useSenReadyEvent(isInitialized) {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (!isReady && !!window.senInner && isInitialized) {
      console.log('onSenReady')
      window.dispatchEvent(new CustomEvent('onSenReady'))
      setIsReady(true)
    }
  }, [isReady, isInitialized])
}

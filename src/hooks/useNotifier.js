import { useRef, useEffect } from 'react'
import AWN from 'awesome-notifications'
import 'awesome-notifications/dist/style.css'

export function useNotifier() {
  const notifyOptions = {
    icons: { enabled: false },
    durations: { warning: 1000 * 60, info: 1000 * 60, tip: 1000 * 30, alert: 1000 * 30 },
  }
  const notifier = useRef(new AWN(notifyOptions))
  useEffect(() => {
    window.sen = window.sen || {}
    window.sen.notifier = notifier.current
  }, [notifier])
  return notifier.current
}

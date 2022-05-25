import { useEffect, useCallback } from 'react'

export function useFunctionBinding(funcName, funcBody, dependencies) {
  const wrapperFunctionBody = useCallback(
    (...args) => {
      console.log(funcName, args)
      if (!funcBody) {
        throw new Error(`No function body! ${funcName}`)
      }
      return funcBody.apply(null, args)
    },
    [funcName, funcBody]
  )

  useEffect(() => {
    function ensureInnerExist() {
      window.senInner = window.senInner || {}
      return window.senInner
    }
    const inner = ensureInnerExist()
    inner[funcName] = wrapperFunctionBody
    // console.log('Bind function: ', funcName, inner)
    return () => {
      // console.log('Unbind function: ', funcName, inner)
      // delete inner[funcName]
    }
  }, [...[wrapperFunctionBody], ...dependencies])
  return wrapperFunctionBody
}

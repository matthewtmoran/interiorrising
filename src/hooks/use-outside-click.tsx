import { useLayoutEffect } from "react"
import { document } from "browser-monads"

function useOutsideClick(ref, handler, when = true) {
  function handle(e) {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      handler(e)
    }
  }
  useLayoutEffect(() => {
    if (when) {
      document.addEventListener("click", handle)
      return () => {
        document.removeEventListener("click", handle)
      }
    }
  }, [ref, handler, when])
}

export default useOutsideClick

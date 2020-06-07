import { useEffect, useState } from 'react'

export function useScroll(): number {
  const [scroll, setScroll] = useState(0)
  useEffect(() => {
    const handler = (): void => setScroll(window.scrollY)
    window.addEventListener('scroll', handler)
    return (): void => {
      window.removeEventListener('scroll', handler)
    }
  }, [])
  return scroll
}

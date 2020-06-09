import React, { useEffect } from 'react'
import { useScroll } from 'custom-hooks/useScroll'
import { useHistory } from 'react-router-dom'

export function ScrollToTop(): JSX.Element {
  const history = useHistory()
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return (): void => {
      unlisten()
    }
  }, [history])

  const scroll = useScroll()
  const handleScroll = (): void => window.scrollTo(0, 0)

  if (scroll < 400) return <div />

  return (
    <div className="scroll" onClick={handleScroll}>
      <div></div>
      <div></div>
    </div>
  )
}

export default ScrollToTop

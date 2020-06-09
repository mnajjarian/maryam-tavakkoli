import React, { useContext, useRef, useEffect } from 'react'
import { DataContext } from '../../../contexts/dataContext'
import { useHistory } from 'react-router-dom'

export function About(): JSX.Element {
  const {
    data: { users },
  } = useContext(DataContext)

  const history = useHistory<{ fromBlog: boolean }>()

  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const {
      location: { state },
    } = history
    if (state && state.fromBlog) {
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [history])

  return (
    <section id="about" ref={ref} className="about col-sm-12 col-md-12">
      <p className="about-p">{users[0].bio}</p>
    </section>
  )
}

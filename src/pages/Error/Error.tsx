import React from 'react'

export function ErrorPage({ error }: { error: string }): JSX.Element {
  return (
    <div className="error">
      <p>{error}</p>
    </div>
  )
}

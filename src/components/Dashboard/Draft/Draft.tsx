import React from 'react'
import { PostTable } from '../PostTable/PostTable'

export function Draft(): JSX.Element {
  const heads = ['post', 'title', 'created', 'updated', 'comments', 'edit', 'delete']
  return (
    <div>
      <PostTable heads={heads} drafts={true} />
    </div>
  )
}

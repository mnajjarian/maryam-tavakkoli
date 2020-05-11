import { ContentBlock } from 'draft-js'
import { Media } from '../Media/Media'
import { ReactNode } from 'react'

type MediaBlock = {
  component: ReactNode
  editable: boolean
}
export function mediaBlockRenderer(block: ContentBlock): MediaBlock | null {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    }
  }
  return null
}

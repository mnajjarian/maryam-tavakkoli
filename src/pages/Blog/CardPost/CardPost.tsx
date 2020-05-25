import React from 'react'
import { Link } from 'react-router-dom'
import { RawDraftContentBlock, RawDraftContentState } from 'draft-js'
import { BlogType } from '../Blog'
import { formatDate } from '../../../Helper'
import IconBubble from '../../../assets/icons/bubble.svg'

type PostProps = {
  post: BlogType
  type?: string
}

export function CardPost(props: PostProps): JSX.Element {
  const {
    post,
    post: { content },
  } = props
  const draft: RawDraftContentState = JSON.parse(content)
  const { blocks } = draft
  const blocksWithText = blocks.filter((b: RawDraftContentBlock) => b.text.length)
  const title = blocksWithText.filter((b: RawDraftContentBlock) => b.type === 'header-one')[0]
  const p = blocksWithText.filter((b: RawDraftContentBlock) => b.type === 'unstyled')[0]
  //const imgUrl: string = draft.entityMap[0] ? draft.entityMap[0].data['src'] : null

  return (
    <div className="card">
      <div className="card__header">
        <Link to={`/blog/${title.text.split(' ').join('-')}`} className="card__title">
          <h5>{title.text}</h5>
        </Link>
        {post.comments.length > 0 && (
          <div className="card__icon">
            <span>{post.comments.length}</span>
            <img src={IconBubble} alt="comment icon" />
          </div>
        )}
      </div>
      <div className="card__text">{p.text}</div>
      <div className="card__footer">
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
    </div>
  )
}

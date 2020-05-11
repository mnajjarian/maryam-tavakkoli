import React, { useState } from 'react'
import { CommentInterface } from '../Blog/Blog'
import { formatDate, formatTime } from '../../Helper'
import { AddComment } from '../AddComment/AddComment'

type Props = {
  comments: CommentInterface[]
  postId: string
}

export function Comment(props: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = (): void => setIsOpen(!isOpen)
  return (
    <div className="comment">
      {props.comments.length ? <p className="comment__header">Comments</p> : ''}
      {props.comments.length > 0 &&
        props.comments.map((comment: CommentInterface) => <CommentCard key={comment._id} item={comment} />)}
      <AddComment closeForm={handleToggle} postId={props.postId} />
    </div>
  )
}

function CommentCard(props: { item: CommentInterface }): JSX.Element {
  const { comment, commenter, createdAt } = props.item
  return (
    <div className="comment__card">
      <div className="comment__body">
        <div className="comment__title">
          <strong>{commenter}</strong>
          <div className="comment__date">
            {formatDate(createdAt)}
            {',  ' + formatTime(createdAt)}
          </div>
        </div>
        <p className="comment__text">{comment}</p>
      </div>
    </div>
  )
}

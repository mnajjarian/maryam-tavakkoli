import React, { useState } from 'react'
import { CommentInterface } from '../Blog'
import { formatDate } from '../CardPost'
import AddComment from '../AddComment'

interface Props {
  comments: CommentInterface[]
  postId: string
}

export const formatTime = (date: string) =>
  new Intl.DateTimeFormat('en-us', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date))

const Comment = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)
  return (
    <div className="comment">
      {props.comments.length ? <p className="comment__header">Comments</p> : ''}
      {/*         {!isOpen &&
        <div className='comment__btn'>
          <img onClick={handleToggle} src={require('../assets/icons/comment.svg')} alt="comment" />
        </div>
        } */}

      {props.comments.length > 0 &&
        props.comments.map((comment: CommentInterface) => (
          <div key={comment._id} className="comment__card">
            <div className="comment__body" key={comment._id}>
              <div className="comment__title">
                <strong>{comment.commenter}</strong>
                <div className="comment__date">
                  {formatDate(comment.createdAt)}
                  {',  ' + formatTime(comment.createdAt)}
                </div>
              </div>
              <p className="comment__text">{comment.comment}</p>
            </div>
          </div>
        ))}
      <AddComment closeForm={handleToggle} postId={props.postId} />
    </div>
  )
}

export default Comment

import React, { useContext } from 'react'
import { CommentInterface } from '../Blog'
import Button from '../Button'
import { DataContext } from '../../contexts/dataContext'
import Table from '../Table'

interface Props {
  comments: CommentInterface[]
}
const CommentList = (props: Props) => {
  const { dataService } = useContext(DataContext)
  const handleDelete = (commentId: string) => () => {
    dataService.removeComment(commentId)
  }

  const heads = ['number', 'comment', 'commenter', 'email', 'action']

  return (
    <div className="comments">
      <Table heads={heads}>
        {props.comments.map((comment: CommentInterface, index: number) => (
          <tr key={comment._id}>
            <td>{index + 1}</td>
            <td>{comment.comment}</td>
            <td>{comment.commenter}</td>
            <td>{comment.email}</td>
            <td>
              <Button text="Delete" handleClick={handleDelete(comment._id)} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

export default CommentList

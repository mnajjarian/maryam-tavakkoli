import React, { useContext } from 'react'
import { CommentInterface } from '../../Blog/Blog'
import { Button } from '../../Button/Button'
import { DataContext } from '../../../contexts/dataContext'
import { Table } from '../../Table/Table'

type Props = {
  comments: CommentInterface[]
}

type TableRow = {
  item: CommentInterface
  index: number
  handleDelete: (args: string) => () => void
}
export function CommentRow(props: TableRow): JSX.Element {
  const {
    item: { comment, commenter, email, _id },
    index,
    handleDelete,
  } = props
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{comment}</td>
      <td>{commenter}</td>
      <td>{email}</td>
      <td>
        <Button text="Delete" handleClick={handleDelete(_id)} />
      </td>
    </tr>
  )
}

export function CommentList(props: Props): JSX.Element {
  const { dataService } = useContext(DataContext)
  const handleDelete = (commentId: string) => (): void => {
    dataService.removeComment(commentId)
  }

  const heads = ['number', 'comment', 'commenter', 'email', 'action']

  return (
    <div className="comments">
      <Table heads={heads}>
        {props.comments.map((comment: CommentInterface, index: number) => (
          <CommentRow item={comment} key={comment._id} index={index} handleDelete={handleDelete} />
        ))}
      </Table>
    </div>
  )
}

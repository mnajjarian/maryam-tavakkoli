import React, { useContext, useState, MouseEvent } from 'react'
import { DataContext } from '../../../contexts/dataContext'
import { Button } from '../../Button/Button'
import { BlogType, CommentInterface } from '../../Blog/Blog'
import { extractFromDraft } from '../../../Helper'
import { Modal } from '../../Modal/Modal'
import { CommentList } from '../CommentList/CommentList'
import { Table } from 'components/Table/Table'
import { Link } from 'react-router-dom'

type TableRow = {
  item: BlogType
  index: number
  handleClick: (id: string) => () => void
  toggleModal: (e: MouseEvent<HTMLAnchorElement>, comments: CommentInterface[]) => void
}
function BlogRow(props: TableRow): JSX.Element {
  const {
    item: { comments, content, createdAt, updatedAt, id },
    index,
    toggleModal,
    handleClick,
  } = props
  const date = (date: string): JSX.Element => <td>{new Date(date).toISOString().slice(0, 10)}</td>
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <a
          href={`/blog/${extractFromDraft(content)
            .title.split(' ')
            .join('-')}`}
        >
          {extractFromDraft(content).title}
        </a>
      </td>
      {date(createdAt)}
      {date(updatedAt)}
      <td>
        <a href="/#" onClick={(e: MouseEvent<HTMLAnchorElement>): void => toggleModal(e, comments)}>
          {comments.length}
        </a>
      </td>
      <td>
        <Link to={`/dashboard/edit/${id}`}>
          <Button text="Edit" />
        </Link>
      </td>
      <td>
        <Button text="Delete" handleClick={handleClick(id)} />
      </td>
    </tr>
  )
}

export function PostTable(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState<CommentInterface[]>([
    {
      commenter: '',
      email: '',
      comment: '',
      createdAt: '',
      _id: '',
      post: '',
    },
  ])
  const {
    data: { blogs },
    dataService,
  } = useContext(DataContext)
  if (!blogs.length) {
    return <div className="posts">You do not have any post in your blog.</div>
  }

  const toggleModal = (): void => setIsOpen(!isOpen)
  const handleClick = (blogId: string) => (): void | null => {
    const alert = 'Are you sure you want to delete this post?'
    if (window.confirm(alert)) {
      dataService.removePost(blogId)
    } else {
      return null
    }
  }

  const toggle = (e: MouseEvent<HTMLAnchorElement>, commentList: CommentInterface[]): void => {
    e.preventDefault()
    setComments(commentList)
    setIsOpen(!isOpen)
  }
  const heads = ['post', 'title', 'created', 'updated', 'comments', 'edit', 'delete']
  return (
    <div className="posts">
      {isOpen && (
        <Modal toggleModal={toggleModal}>
          <CommentList comments={comments} />
        </Modal>
      )}
      <div className="posts-table">
        <Table heads={heads}>
          {blogs.map((blog: BlogType, index: number) => (
            <BlogRow key={blog.id} item={blog} index={index} toggleModal={toggle} handleClick={handleClick} />
          ))}
        </Table>
      </div>
    </div>
  )
}

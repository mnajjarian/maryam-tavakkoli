import React, { useContext, useState, MouseEvent } from 'react'
import { DataContext } from '../../../contexts/dataContext'
import Button from '../../Button'
import { BlogType, CommentInterface } from '../../Blog'
import { extractFromDraft } from '../../../Helper'
import Modal from '../../Modal'
import CommentList from '../../CommentList'
import Table from 'components/Table'
import { Link } from 'react-router-dom'

function Posts(): JSX.Element {
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

  const handleClick = (blogId: string) => (): void | null => {
    const alert = 'Are you sure you want to delete this post?'
    if (window.confirm(alert)) {
      dataService.removePost(blogId)
    } else {
      return null
    }
  }

  const toggleModal = (e: MouseEvent<HTMLAnchorElement>, commentList: CommentInterface[]): void => {
    e.preventDefault()
    setComments(commentList)
    setIsOpen(!isOpen)
  }
  const heads = ['post', 'title', 'created', 'updated', 'comments', 'edit', 'delete']
  return (
    <div className="posts">
      <Modal isOpen={isOpen} handleClose={(): void => setIsOpen(!isOpen)}>
        <CommentList comments={comments} />
      </Modal>
      <div className="posts-table">
        <Table heads={heads}>
          {blogs.map((blog: BlogType, index: number) => (
            <tr key={blog.id}>
              <td>{index + 1}</td>
              <td>
                <a
                  href={`/blog/${extractFromDraft(blog.content)
                    .title.split(' ')
                    .join('-')}`}
                >
                  {extractFromDraft(blog.content).title}
                </a>
              </td>
              <td>{new Date(blog.createdAt).toISOString().slice(0, 10)}</td>
              <td>{new Date(blog.updatedAt).toISOString().slice(0, 10)}</td>
              <td>
                <a href="/#" onClick={(e: MouseEvent<HTMLAnchorElement>): void => toggleModal(e, blog.comments)}>
                  {blog.comments.length}
                </a>
              </td>
              <td>
                <Link to={`/dashboard/edit/${blog.id}`}>
                  <Button text="Edit" />
                </Link>
              </td>
              <td>
                <Button text="Delete" handleClick={handleClick(blog.id)} />
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  )
}

export default Posts

import React, { useContext, useState } from "react";
import { DataContext } from "../../contexts/dataContext";
import Button from "../Button";
import { BlogType, IComment } from "../Blog";
import { extractFromDraft } from "../Jumbotron";
import Modal from "../Modal";
import CommentList from "../Comments";

const Posts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<IComment[]>([{
    commenter: '',
    email: '',
    comment: '',
    createdAt: '',
    _id: '',
    post: ''
  }])
  const {
    data: { blogs },
    dataService
  } = useContext(DataContext);
  if (!blogs.length) {
    return <div></div>;
  }

  const handleClick = (blogId: string) => () => {
    console.log("delete", blogId);
    dataService.removePost(blogId);
  };

  const toggleModal = (commentList: IComment[]) => () => {
    setComments(commentList)
    setIsOpen(!isOpen);
  }

  return (
    <div className="posts">
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)}>
        <CommentList comments={comments} />
      </Modal>
      <div className="posts-table">
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>Title</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Comments</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: BlogType, index: number) => (
              <tr key={blog.id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`/blog/${extractFromDraft(blog.content)
                      .title.split(" ")
                      .join("-")}`}
                  >
                    {extractFromDraft(blog.content).title}
                  </a>
                </td>
                <td>{new Date(blog.createdAt).toISOString().slice(0, 10)}</td>
                <td>{new Date(blog.updatedAt).toISOString().slice(0, 10)}</td>
                <td><a href='#' onClick={toggleModal(blog.comments)}>{blog.comments.length}</a></td>
                <td>
                  <a href={`/dashboard/edit/${blog.id}`}>
                    <Button text="Edit" />
                  </a>
                </td>
                <td>
                  <Button text="Delete" handleClick={handleClick(blog.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;

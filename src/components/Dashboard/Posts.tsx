import React, { useContext, useState } from "react";
import { DataContext } from "../../contexts/dataContext";
import Button from "../Button";
import { BlogType, IComment } from "../Blog";
import { extractFromDraft } from "../Jumbotron";
import Modal from "../Modal";
import CommentList from "../Comments";
import Table from "components/Table";
import { Link } from "react-router-dom";

const Posts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<IComment[]>([
    {
      commenter: "",
      email: "",
      comment: "",
      createdAt: "",
      _id: "",
      post: ""
    }
  ]);
  const {
    data: { blogs },
    dataService
  } = useContext(DataContext);
  if (!blogs.length) {
    return <div className="posts">You don't have any post in your blog.</div>;
  }

  const handleClick = (blogId: string) => () => {
    const alert = `Are you sure you want to delete this post?`
    if(window.confirm(alert)) {
      dataService.removePost(blogId);
    } else {
      return null
    }
  };

  const toggleModal = (e: Event, commentList: IComment[]) => {
    e.preventDefault();
    setComments(commentList);
    setIsOpen(!isOpen);
  };
  const heads = [
    "post",
    "title",
    "created",
    "updated",
    "comments",
    "edit",
    "delete"
  ];
  return (
    <div className="posts">
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)}>
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
                    .title.split(" ")
                    .join("-")}`}
                >
                  {extractFromDraft(blog.content).title}
                </a>
              </td>
              <td>{new Date(blog.createdAt).toISOString().slice(0, 10)}</td>
              <td>{new Date(blog.updatedAt).toISOString().slice(0, 10)}</td>
              <td>
                <a
                  href="/#"
                  onClick={(e: any) => toggleModal(e, blog.comments)}
                >
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
  );
};

export default Posts;

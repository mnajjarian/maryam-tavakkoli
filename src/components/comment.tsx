import React, { useState } from "react";
import { IComment } from "./Blog";
import { formatDate } from "./CardPost";
import Button from "./Button";
import AddComment from "./AddComment";

interface Props {
  comments: IComment[];
  postId: string;
}

export const formatTime = (date: string) =>
  new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(date));


const Comment = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <div className="comment">
      <div className="comment__board">
        <h3>Comments</h3>
        {!isOpen && <Button text="ADD" handleClick={handleToggle} />}
      </div>
      {isOpen && <AddComment closeForm={handleToggle} postId={props.postId} />}
      {props.comments.length > 0 &&
        props.comments.map((comment: IComment) => (
          <div className="comment__card">
            <div className="comment__body" key={comment._id}>
              <div className="comment__title">
                <strong>{comment.commenter}</strong>
                <div>
                  {formatDate(comment.createdAt)}
                  {",  " + formatTime(comment.createdAt)}
                </div>
              </div>
              <p className="comment__text">{comment.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comment;

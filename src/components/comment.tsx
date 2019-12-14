import React from "react";
import { IComment } from "./Blog";
import { formatDate } from "./CardPost";

interface Props {
  comments: IComment[];
}

export const formatTime = (date:string) =>
new Intl.DateTimeFormat("en-us", {
  hour: "numeric",
  minute: "numeric"
}).format(new Date(date));

const Comment = (props: Props) => {
  return (
    <div className="comment">
      <h3>Comments</h3>
      <div className="comment__card">
        {props.comments.map((comment: IComment) => (
          <div className="comment__body" key={comment.id}>
            <div className="comment__title" >
              <strong>{comment.commenter}</strong>
<div>{formatDate(comment.createdAt)}{',  ' + formatTime(comment.createdAt)}</div>
            </div>
            <p className="comment__text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;

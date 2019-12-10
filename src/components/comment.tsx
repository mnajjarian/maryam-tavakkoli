import React from "react";
import { IComment } from "./Blog";

interface Props {
  comments: IComment[];
}
const Comment = (props: Props) => {
  return (
    <div>
      <h3>Comments</h3>
      <div className="comment">
        {props.comments.map((comment: IComment) => (
          <>
            <p className="comment__text" >{comment.comment}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default Comment;

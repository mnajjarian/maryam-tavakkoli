import React, { useContext } from "react";
import { IComment } from "./Blog";
import Button from "./Button";
import { DataContext } from "../contexts/dataContext";

interface Props {
  comments: IComment[];
}
const CommentList = (props: Props) => {
    const { dataService } = useContext(DataContext);
    const handleDelete = (commentId: string) => () => {
        dataService.removeComment(commentId)
    }
  return (
    <div className="comments">
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Comment</th>
            <th>Commenter</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.comments.map((comment: IComment, index: number) => (
            <tr key={comment._id} >
              <td>{index + 1}</td>
              <td>{comment.comment}</td>
              <td>{comment.commenter}</td>
              <td>{comment.email}</td>
              <td>
                <Button text="Delete" handleClick={handleDelete(comment._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentList;

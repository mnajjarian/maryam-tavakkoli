import React, { useState, FormEvent } from "react";
import { IComment } from "./Blog";
import { formatDate } from "./CardPost";
import Button from "./Button";

interface Props {
  comments: IComment[];
}

interface CommentForm {
  closeForm: () => void;
}
interface State {
  commenter: string;
  email: string;
  comment: string;
}
export const formatTime = (date: string) =>
  new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(date));

const AddComment = (props: CommentForm) => {
  const [state, setState] = useState<State>({
    commenter: '',
    email: '',
    comment: ''
  })
  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value
    })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(state)
  }
  const { closeForm } = props;
  const { commenter, email, comment } = state;
  return (
    <form className="comment__form" onSubmit={handleSubmit}>
      <div className="comment__form__group">
        <label className="comment__form__label" htmlFor="commentor">
          Name
        </label>
        <input
          className="comment__form__input"
          type="text"
          name="commenter"
          value={commenter}
          onChange={handleChange}
        />
      </div>
      <div className="comment__form__group">
        <label className="comment__form__label" htmlFor="email">
          Email
        </label>
        <input 
        className="comment__form__input" 
        type="email"
        name="email" 
        value={email}
        onChange={handleChange}
        />
      </div>
      <div className="comment__form__group">
        <label className="comment__form__label" htmlFor="comment">
          Comment
        </label>
        <textarea 
        className="comment__form__textarea"
        name="comment"
        value={comment}
        onChange={handleChange}
        rows={10} 
        cols={14} 
        />
      </div>
      <div className="comment__form__button">
        <Button text="Cancel" handleClick={closeForm} />
        <Button text="ADD" />
      </div>
    </form>
  );
};
const Comment = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <div className="comment">
      <div className="comment__board">
        <h3>Comments</h3>
        {!isOpen && <Button text="ADD" handleClick={handleToggle} />}
      </div>
      {isOpen && <AddComment closeForm={handleToggle} />}
      <div className="comment__card">
        {props.comments.map((comment: IComment) => (
          <div className="comment__body" key={comment.id}>
            <div className="comment__title">
              <strong>{comment.commenter}</strong>
              <div>
                {formatDate(comment.createdAt)}
                {",  " + formatTime(comment.createdAt)}
              </div>
            </div>
            <p className="comment__text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;

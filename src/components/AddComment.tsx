import React, { useState, useContext, FormEvent } from "react";
import Button from "./Button";
import { DataContext } from "../contexts/dataContext";

interface CommentForm {
  closeForm: () => void;
  postId: string;
}

interface State {
  commenter: string;
  email: string;
  comment: string;
  post: string;
}

const AddComment = (props: CommentForm) => {
  const [state, setState] = useState<State>({
    commenter: "",
    email: "",
    comment: "",
    post: props.postId
  });
  const { dataService } = useContext(DataContext);

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setState({
      ...state,
      [name]: value
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      dataService.addComment(state);
    } catch (error) {
      console.log(error);
    }
  };
  const { closeForm } = props;
  const { commenter, email, comment } = state;
  return (
    <div className="comments">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Leave a comment</h3>
        <div className="form__group">
          <label className="form__label" htmlFor="commentor">
            Name
          </label>
          <input
            className="form__input"
            type="text"
            name="commenter"
            value={commenter}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            className="form__input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="form__textarea"
            name="comment"
            value={comment}
            onChange={handleChange}
            rows={7}
            cols={12}
          />
        </div>
        <div className="form__button">
{/*           <Button text="Cancel" handleClick={closeForm} /> */}
          <Button text="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddComment;

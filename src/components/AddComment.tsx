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

export default AddComment;

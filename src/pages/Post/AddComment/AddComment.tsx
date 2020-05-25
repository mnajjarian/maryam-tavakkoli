import React, { useState, useContext, FormEvent, ChangeEvent } from 'react'
import { Button } from '../../../components/Button/Button'
import { DataContext } from '../../../contexts/dataContext'
import { DataServices } from 'services/dataService'

interface CommentForm {
  closeForm: () => void
  postId: string
}

interface State {
  commenter: string
  email: string
  comment: string
  post: string
}

export function AddComment(props: CommentForm): JSX.Element {
  const [state, setState] = useState<State>({
    commenter: '',
    email: '',
    comment: '',
    post: props.postId,
  })
  const { dataDispatch } = useContext(DataContext)
  const dataService = new DataServices(dataDispatch)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    try {
      dataService.addComment(state)
    } catch (error) {
      console.log(error)
    }
  }

  const { commenter, email, comment } = state
  return (
    <div className="comment__form">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Leave a comment</h3>
        <div className="form__group">
          <label className="form__label" htmlFor="commentor">
            Name
          </label>
          <input className="form__input" type="text" name="commenter" value={commenter} onChange={handleChange} />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input className="form__input" type="email" name="email" value={email} onChange={handleChange} />
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
            rows={3}
            cols={12}
          />
        </div>
        <div className="form__button">
          {/*           <Button text="Cancel" handleClick={closeForm} /> */}
          <Button text="Submit" />
        </div>
      </form>
    </div>
  )
}

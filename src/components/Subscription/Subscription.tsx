/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, ChangeEvent } from 'react'
import { Button } from '../Button/Button'
import { emailValidation } from 'Helper'
import classNames from 'classnames'

type Props = {
  handleToggle: () => void
}
export function Subscription({ handleToggle }: Props): JSX.Element {
  const [state, setState] = useState('')
  const [shake, setShake] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState(e.target.value)
  }

  const validateEmail = (): void => {
    console.log('blur')
    if (state.length > 0 && !emailValidation(state)) {
      setErrorMsg('*Please enter a valid email address')
    } else {
      setErrorMsg(null)
    }
  }
  const handleSubmit = (): void => {
    if (emailValidation(state)) {
      setTimeout(() => {
        handleToggle()
      }, 500)
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
      }, 500)
    }
  }
  return (
    <div className="subscription">
      <h2>Subscription</h2>
      <div className="subscription__text">
        Recive updates and latest post direct in your email, Simply enter your email below
      </div>
      <div className="form">
        <p
          className={classNames({
            subscription__error: true,
            subscription__shake: shake,
          })}
        >
          {errorMsg}
        </p>
        <div className="form__group">
          <input
            className="form__input"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={validateEmail}
          />
          <Button text="submit" handleClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

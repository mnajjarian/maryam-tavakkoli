import React, { useState, FormEvent, useContext, ReactNode } from 'react'
import { Button } from '../Button/Button'
import { AuthContext } from 'contexts/authContext'
import { AuthService } from 'services/authService'

export function Signup(): ReactNode {
  const { authDispatch } = useContext(AuthContext)
  const authService = new AuthService(authDispatch)
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })

  const handleChange = (e: FormEvent): void => {
    const { name, value } = e.target as HTMLInputElement
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      await authService.signup(state)
      window.location.reload()
    } catch (error) {
      alert(error.message)
    }
  }

  const { firstName, lastName, username, password } = state

  return (
    <div className="login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Create an account</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="form__input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="form__input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            className="form__input"
            type="text"
            name="username"
            placeholder="Email"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form__button">
          <Button text="Create account" />
        </div>
      </form>
    </div>
  )
}

export default Signup

import React, { useState, FormEvent, useContext } from 'react'
import Button from '../Button'
import { AuthContext } from 'contexts/authContext'

const Signup = () => {
  const { authService } = useContext(AuthContext)
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await authService.signup(state)
      window.location.reload()
    } catch (error) {
      alert(error.message)
    }
  }

  const { firstName, lastName, email, password } = state

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
            name="email"
            placeholder="Email"
            value={email}
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

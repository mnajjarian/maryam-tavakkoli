import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../contexts/authContext';

const Login = () => {
    const[state, setState] = useState({email: '', password: ''});
    const { authService } = useContext(AuthContext);

    const handleChange = (e: React.FormEvent): void => {
        const {name, value } = e.target as HTMLInputElement;
        console.log(e.target);
        setState({
            ...state,
            [name]: value
        })
    }
    const { email, password } = state;
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        authService.signin(state)
    }
    return (
    <div className="login" >
        <form className="login__form" onSubmit={handleSubmit} >
            <label className="login__form--label" htmlFor="username" >Username</label>
            <input
                  className="login__form--input"
              type="text"
              name="email"
              placeholder="Username"
              value={email}
              onChange={handleChange}
            />
            <label className="login__form--label" htmlFor="password" >Password</label>
            <input
            className="login__form--input"
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={handleChange}
            />
            <button type="submit" className="login__button" >Login</button>
        </form>
    </div>
)};

export default Login;
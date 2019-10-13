import React, { useState } from 'react';

const Login = () => {
    const[state, setState] = useState({username: '', password: ''});

    const handleChange = (e: React.FormEvent): void => {
        const {name, value } = e.target as HTMLInputElement;
        console.log(e.target);
        setState({
            ...state,
            [name]: value
        })
    }
    const { username, password } = state;
    return (
    <div className="login" >
        <form className="login__form" >
            <label className="login__form--label" htmlFor="username" >Username</label>
            <input
                  className="login__form--input"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
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
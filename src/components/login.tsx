import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Redirect } from 'react-router';

interface InitialState {
    email: string;
    password: string;
}
const initialState: InitialState = { email: '', password: '' };

const Login = () => {
    const[state, setState] = useState<InitialState>(initialState);
    const { authService, authState: { isLoggedIn } } = useContext(AuthContext);

    const { email, password } = state;

    const handleChange = (e: React.FormEvent): void => {
        const {name, value } = e.target as HTMLInputElement;
        setState({
            ...state,
            [name]: value
        })
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await authService.signin(state)
            return <Redirect to="/dashboard" />
        } catch (error) {
            alert(error.message)
        }
    }
    if(isLoggedIn) {
        return <Redirect to="/dashboard" />
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
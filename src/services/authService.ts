import axios from 'axios'
const baseURL = 'http://localhost:3001';


export const useAuthService = (state: any, dispatch: any) => {
    const signin = (credentials: any) => {
        console.log(credentials)
        axios.post(`${baseURL}/login`, credentials, 
        { withCredentials: true })
        .then(res => {
            console.log(res)
        })
    };
    return {
        signin
    }
};
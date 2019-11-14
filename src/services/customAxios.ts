import axios from 'axios';

const baseURL = 'http://localhost:3001'

export const customAxios = axios.create({
    baseURL
})

export const setAuthToken = (token: string) => {
    if(token) {
        customAxios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
}
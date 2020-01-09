import axios from 'axios';

const baseURL = '/api'

export const customAxios = axios.create({
    baseURL
})

export const setAuthToken = (token: string) => {
    if(token) {
        customAxios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
}
import axios from 'axios'

const baseURL = '/api'

export const customAxios = axios.create({
  withCredentials: true,
  baseURL,
})

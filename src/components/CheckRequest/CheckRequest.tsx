import React, { useState } from 'react'
import { AxiosError } from 'axios'
import { customAxios } from 'services/customAxios'
import { ErrorPage } from 'pages/Error/Error'

export const CheckRequest = (props: { children: JSX.Element }): JSX.Element => {
  const [errMeassage, setErrMessage] = useState<null | string>(null)

  customAxios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.message === 'Network Error' && !error.response) {
      setErrMessage('Network error - make sure API is running')
    } else if (error.response) {
      const { status, data, config } = error.response
      if (status === 404) {
        setErrMessage('Not Found!')
      }
      if (status === 400 && config.method === 'get' && data.error.hasOwnProperty('id')) {
        setErrMessage('Not Found!')
      }
      if (status === 500) {
        setErrMessage('500 - Server error')
      }
    }

    return Promise.reject(error)
  })
  if (errMeassage) {
    return <ErrorPage error={errMeassage} />
  }
  return props.children
}

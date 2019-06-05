import { useEffect, useState, useReducer } from 'react'
import auth from './auth'

const api = async function (method, url, data, headers = {}) {
  if (auth.loggedIn()) {
    headers['Authorization'] = auth.getToken()
  }

  try {
    const response = await fetch(url, {
      method: method.toUpperCase(),
      body: JSON.stringify(data),
      credentials: api.credentials,
      headers: Object.assign({}, api.headers, headers)
    })

    const newToken = response.headers.get('Authorization')

    if (newToken) auth.setToken(newToken)

    return await response.json()
  } catch (e) {
    console.error(e)
  }
}

api.credentials = 'include'
api.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

['get', 'post', 'put'].forEach(method => {
  api[method] = api.bind(null, method)
})

export default api

const dataFetchReducer = (state, { type, payload }) => {
  switch (type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error()
  }
}

export const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  })

  useEffect(() => {
    let didCancel = false

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })

      try {
        const result = await api.get(url)

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
    }

    fetchData()

    return () => {
      didCancel = true
    }
  }, [url])

  return [state, setUrl]
}

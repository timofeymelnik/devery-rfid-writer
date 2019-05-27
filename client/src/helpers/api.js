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

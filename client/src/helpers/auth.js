import { decode } from 'jwt-simple'

const TOKEN = 'id_token'

class Auth {
  decodeToken = () => {
    try {
      return decode(this.getToken(), process.env.REACT_APP_JWT_SECRET)
    } catch (err) {
      console.error(err)
      return false
    }
  }

  isTokenValid = () => {
    const { expire } = this.decodeToken()
    return Date.now() < expire
  }

  isSigned = () => {
    const { signed } = this.decodeToken()
    return !!signed
  }

  loggedIn = () => {
    const token = this.getToken()
    return !!token && this.isTokenValid(token)
  }

  setToken = idToken => {
    window.localStorage.setItem(TOKEN, idToken)
  }

  getToken = () => {
    return window.localStorage.getItem(TOKEN)
  }

  logout = () => {
    window.localStorage.removeItem(TOKEN)
  }

}

export default new Auth()

import axios from 'axios';
import urljoin from 'url-join';

const BACKEND_ROOT_URL = "http://35.236.219.61/topix-api/"
const AUTH_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/auth')

class AuthAPI {
  
  static auth ({ username, password }) {
    return axios.post(AUTH_API_URL, {
      username,
      password
    });
  }

  static check ({ token }) {
    const url = urljoin(AUTH_API_URL, '/check');
    return axios.post(url, { token });
  }

}

export default AuthAPI;
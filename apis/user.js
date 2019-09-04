import axios from 'axios';
import urljoin from 'url-join';

const BACKEND_ROOT_URL = "http://35.236.219.61/topix-api/"
const USER_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/user')

class UserAPI {
  
  static createAccount ({ username, email, password }) {
    return axios.post(USER_API_URL, {
      username,
      email,
      password
    })
  }

}

export default UserAPI;
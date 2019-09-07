import axios from 'axios';
import urljoin from 'url-join';
import { getAxiosConfig } from './helpers';
import queryString from 'query-string';

const BACKEND_ROOT_URL = "http://35.236.219.61/topix-api/"
const POST_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/post')

class PostAPI {

  static fetchPosts ({ authToken, gameId }) {
    const params = { gameId }
    const url = `${POST_API_URL}?${queryString.stringify(params)}`
    return axios.get(
      url,
      getAxiosConfig(authToken),
    )
  }

  static createPost ({ authToken, gameId, message }) {
    return axios.post(
      POST_API_URL,
      { gameId, message },
      getAxiosConfig(authToken),
    )
  }

}

export default PostAPI;
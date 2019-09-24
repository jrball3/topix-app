import axios from 'axios';
import urljoin from 'url-join';
import { getAxiosConfig } from './helpers';
import { BACKEND_ROOT_URL } from '../Constants';
import qs from 'query-string';

const FRIENDS_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/friendship')

class FriendshipAPI {
  
  static fetchFriendships ({ authToken }) {
    return axios.get(
      FRIENDS_API_URL,
      getAxiosConfig(authToken),
    )
  }

  static sendFriendRequest ({ authToken, username }) {
    const data = { username };
    return axios.post(
      FRIENDS_API_URL,
      ...data,
      getAxiosConfig(authToken)
    )
  }

  static acceptFriendship ({ authToken, friendshipId }) {
    const acceptUrl = urljoin(FRIENDS_API_URL, friendshipId, 'accept');
    return axios.post(
      acceptUrl,
      {},
      getAxiosConfig(authToken)
    )
  }

  static rejectFriendship ({ authToken, friendshipId }) {
    const acceptUrl = urljoin(FRIENDS_API_URL, friendshipId, 'reject');
    return axios.post(
      acceptUrl,
      {},
      getAxiosConfig(authToken)
    )
  }

}

export default FriendshipAPI;
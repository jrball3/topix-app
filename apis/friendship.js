import axios from 'axios';
import urljoin from 'url-join';
import { getAxiosConfig } from './helpers';
import { BACKEND_ROOT_URL } from '../Constants';
import qs from 'query-string';

const FRIENDS_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/friendship')

class FriendsAPI {
  
  static fetchFriendships ({ authToken }) {
    return axios.get(
      FRIENDS_API_URL,
      getAxiosConfig(authToken),
    )
  }

  static sendFriendRequest ({ authtoken, user }) {

  }

  static acceptFriendship ({ authToken, friendshipId }) {
    
  }

  static rejectFriendship ({ authToken, friendshipId }) {

  }

}

export default FriendsAPI;
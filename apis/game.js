import axios from 'axios';
import urljoin from 'url-join';
import { getAxiosConfig } from './helpers';
import { BACKEND_ROOT_URL } from '../Constants';
import qs from 'query-string';

const GAME_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/game')

class GameAPI {
  
  static fetchGames ({ authToken }) {
    return axios.get(
      GAME_API_URL,
      getAxiosConfig(authToken),
    )
  }

  static fetchOneGame ({ authToken, gameId }) {
    return axios.get(
      urljoin(GAME_API_URL, gameId), 
      getAxiosConfig(authToken),
    )
  }

  static createGame ({ authToken, name, type, players }) {
    return axios.post(
      GAME_API_URL,
      { name, type, players },
      getAxiosConfig(authToken),
    )
  }

}

export default GameAPI;
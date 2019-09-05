import axios from 'axios';
import urljoin from 'url-join';
import { getAxiosConfig } from './helpers';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})

const BACKEND_ROOT_URL = "http://35.236.219.61/topix-api/"
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
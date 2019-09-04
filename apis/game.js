import axios from 'axios';
import urljoin from 'url-join';

const BACKEND_ROOT_URL = "http://35.236.219.61/topix-api/"
const GAME_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/game')

class GameAPI {
  
  static fetchGames ({ authToken }) {
    return axios.post(
      GAME_API_URL, 
      headers = {'Authorization': 'Bearer ' + authToken
    })
  }

}

export default GameAPI;
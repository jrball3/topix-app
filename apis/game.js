import axios from 'axios';
import urljoin from 'url-join';

const BACKEND_ROOT_URL = "http://35.236.219.61/topix-api/"

class GameAPI {
  GAME_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/game')

  fetchGames ({ authToken }) {
    return axios.post(
      this.GAME_API_URL, 
      headers = {'Authorization': 'Bearer ' + authToken
    })
  }

}

export default GameAPI;
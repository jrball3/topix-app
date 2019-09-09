import axios from 'axios';
import urljoin from 'url-join';
import { getAxiosConfig } from './helpers';
import { BACKEND_ROOT_URL } from '../Constants';
import qs from 'query-string';

const SCORE_API_URL = urljoin(BACKEND_ROOT_URL, 'api/v1/score')

class ScoreAPI {

  static fetchScores ({ authToken, gameId }) {
    const qStr = qs.stringify({ gameId })
    return axios.get(
      `${SCORE_API_URL}?${qStr}`,
      getAxiosConfig(authToken),
    )
  }

}

export default ScoreAPI;
import axios from 'axios';

import { createBackendUrl } from '../utils/api';
import {
  FORBIDDEN,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '../utils/statusCodes';

const cache = {};

export async function handler({ queryStringParameters: { name } }, context) {
  if (!name) {
    return {
      statusCode: FORBIDDEN,
    };
  }

  if (cache[name]) {
    return {
      statusCode: OK,
      body: cache[name],
    };
  }

  const body = {
    overall: [],
    '7day': [],
    '1month': [],
    '3month': [],
    '6month': [],
    '12month': [],
  };

  try {
    await Promise.all(
      Object.keys(body).map(async period => {
        const endpoint = createBackendUrl('user.gettoptracks', {
          user: name,
          limit: 15,
          period,
        });

        try {
          const {
            data: { toptracks },
          } = await axios.get(endpoint);

          body[period] = toptracks.track.map(({ artist, name, playcount }) => {
            return {
              artist: artist.name,
              track: name,
              playCount: playcount,
            };
          });
        } catch (error) {
          // ignore the error, fallback defined in body will be fine
        }
      }),
    );

    const json = JSON.stringify(body);

    cache[name] = json;

    return {
      statusCode: OK,
      body: json,
    };
  } catch (error) {
    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
    };
  }
}

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
      body: cache[name],
      statusCode: OK,
    };
  }

  const endpoint = createBackendUrl('user.getlovedtracks', {
    limit: 200,
    user: name,
  });

  try {
    const { data } = await axios.get(endpoint);

    const body = JSON.stringify(
      data.lovedtracks.track.map(({ artist, image, date, name, mbid }) => ({
        artist: artist.name,
        id: mbid,
        img: image.find(({ size }) => size === 'small')['#text'],
        timestamp: date.uts,
        track: name,
      }))
    );

    cache[name] = body;

    return {
      body,
      headers: {
        ContentType: 'application/json',
      },
      statusCode: OK,
    };
  } catch (error) {
    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
    };
  }
}

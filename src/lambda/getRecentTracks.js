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
      body: JSON.stringify([]),
    };
  }

  if (cache[name]) {
    return {
      statusCode: OK,
      body: cache[name],
    };
  }

  const endpoint = createBackendUrl('user.getrecenttracks', {
    user: name,
  });

  try {
    const { data } = await axios.get(endpoint);

    const body = JSON.stringify(
      data.recenttracks.track.map(({ artist, image, date, name, mbid }) => ({
        artist: artist['#text'],
        timestamp: date.uts,
        track: name,
        img: image.find(({ size }) => size === 'small')['#text'],
        id: mbid,
      })),
    );

    cache[name] = body;

    return {
      statusCode: OK,
      body,
      headers: {
        ContentType: 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
      body: JSON.stringify([]),
    };
  }
}

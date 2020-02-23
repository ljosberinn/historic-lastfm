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

  const endpoint = createBackendUrl('user.gettopartists', {
    user: name,
    limit: 8,
  });

  try {
    const {
      data: { topartists },
    } = await axios.get(endpoint);

    const body = JSON.stringify(
      topartists.artist.map(({ name, image, playcount }) => ({
        name,
        img: image.find(({ size }) => size === 'large')['#text'],
        playCount: playcount,
      })),
    );

    cache[name] = body;

    return {
      statusCode: OK,
      body,
    };
  } catch (error) {
    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
    };
  }
}

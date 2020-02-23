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

  const endpoint = createBackendUrl('user.getinfo', { user: name });

  try {
    const {
      data: { user },
    } = await axios.get(endpoint);

    const body = JSON.stringify({
      country: user.country,
      realName: user.realname,
      registered: user.registered.unixtime,
      totalPlayCount: user.playcount,
      img: user.image.find(({ size }) => size === 'extralarge')['#text'],
      subscriber: user.subscriber > 0,
      playlists: user.playlists,
      name: user.name,
    });

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
    };
  }
}

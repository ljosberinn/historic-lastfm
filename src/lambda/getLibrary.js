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

  const endpoint = createBackendUrl('library.getArtists', {
    limit: 1,
    user: name,
  });

  try {
    const {
      data: { artists },
    } = await axios.get(endpoint);

    const body = JSON.stringify({ totalArtistAmount: artists['@attr'].total });

    cache[name] = body;

    return {
      body,
      headers: {
        ContentType: 'application/json',
      },
      statusCode: OK,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
    };
  }
}

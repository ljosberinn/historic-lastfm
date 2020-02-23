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

  const endpoint = createBackendUrl('library.getArtists', {
    user: name,
    limit: 1,
  });

  try {
    const {
      data: { artists },
    } = await axios.get(endpoint);

    const body = JSON.stringify({ totalArtistAmount: artists['@attr'].total });

    cache[name] = body;

    return {
      statusCode: OK,
      body,
      headers: {
        ContentType: 'application/json',
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
    };
  }
}

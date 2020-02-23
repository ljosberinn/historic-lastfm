import axios from 'axios';

import { createBackendUrl } from '../utils/api';
import {
  FORBIDDEN,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} from '../utils/statusCodes';

const cache = {};

export async function handler({ queryStringParameters: { name } }) {
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

  const endpoint = createBackendUrl('user.getfriends', {
    user: name,
    limit: 200,
  });

  try {
    const {
      data: { friends },
    } = await axios.get(endpoint);

    const body = JSON.stringify(
      friends.user.map(({ name, image, country, subscriber }) => ({
        name,
        img: image.find(({ size }) => size === 'small')['#text'],
        country,
        subscriber,
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
    if (error.message.includes(BAD_REQUEST)) {
      return {
        statusCode: OK,
        body: JSON.stringify([]),
      };
    }

    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
    };
  }
}

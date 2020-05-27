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
      body: cache[name],
      statusCode: OK,
    };
  }

  const endpoint = createBackendUrl('user.getfriends', {
    limit: 200,
    user: name,
  });

  try {
    const {
      data: { friends },
    } = await axios.get(endpoint);

    const body = JSON.stringify(
      friends.user.map(({ name, image, country, subscriber }) => ({
        country,
        img: image.find(({ size }) => size === 'small')['#text'],
        name,
        subscriber,
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
    if (error.message.includes(BAD_REQUEST)) {
      return {
        body: JSON.stringify([]),
        statusCode: OK,
      };
    }

    return {
      statusCode: error.message.includes(NOT_FOUND)
        ? NOT_FOUND
        : INTERNAL_SERVER_ERROR,
    };
  }
}

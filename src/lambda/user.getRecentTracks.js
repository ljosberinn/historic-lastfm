import axios from 'axios';

import { createUrl } from '../utils/api';
import { FORBIDDEN, OK, INTERNAL_SERVER_ERROR } from '../utils/statusCodes';

const endpoint = createUrl('user.getrecenttracks');

export async function handler({ queryStringParameters: { name } }, context) {
  if (!name) {
    return {
      statusCode: FORBIDDEN,
    };
  }

  try {
    const { data } = await axios.get(endpoint);

    return {
      statusCode: OK,
      body: JSON.stringify(data),
      headers: {
        ContentType: 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: INTERNAL_SERVER_ERROR,
    };
  }
}

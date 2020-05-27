const key = process.env.REACT_APP_API_KEY;

export const createBackendUrl = (method, fields = {}) =>
  [
    'http://ws.audioscrobbler.com/2.0/',
    new URLSearchParams({
      api_key: key,
      format: 'json',
      method,
      ...fields,
    }).toString(),
  ].join('?');

export const createFrontendUrl = (endpoint, fields = {}) =>
  [
    `/.netlify/functions/${endpoint}`,
    new URLSearchParams(fields).toString(),
  ].join('?');

const key = process.env.REACT_APP_API_KEY;

export const createUrl = method =>
  `http://ws.audioscrobbler.com/2.0/` +
  new URLSearchParams({
    method,
    api_key: key,
    format: 'json',
  }).toString();

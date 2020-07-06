import { Timespan } from '../context/ProfileContext';

const key = process.env.API_KEY;

type Method =
  | 'user.getLovedTracks'
  | 'user.getInfo'
  | 'library.getArtists'
  | 'user.getFriends'
  | 'user.getRecentTracks'
  | 'user.getTopArtists'
  | 'user.getTopTracks';
type Fields = {
  user: string;
  limit?: string;
  period?: Timespan;
};

export const createBackendUrl = (
  method: Method,
  fields: Fields = { user: 'XHS207GA' }
) =>
  [
    'http://ws.audioscrobbler.com/2.0/',
    new URLSearchParams({
      api_key: key,
      format: 'json',
      method,
      ...fields,
    }).toString(),
  ].join('?');

export const createFrontendUrl = (endpoint: string, fields = {}) =>
  [
    `/.netlify/functions/${endpoint}`,
    new URLSearchParams(fields).toString(),
  ].join('?');

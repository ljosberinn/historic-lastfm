import { Timespan } from '../context/ProfileContext';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const key = process.env.API_KEY!;

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
  { user = 'XHS207GA', limit = '200', period = Timespan.overall }: Fields
): string =>
  [
    'http://ws.audioscrobbler.com/2.0/',
    new URLSearchParams({
      api_key: key,
      format: 'json',
      method,
      user,
      limit,
      period,
    }).toString(),
  ].join('?');

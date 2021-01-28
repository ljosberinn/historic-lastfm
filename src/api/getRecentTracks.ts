import type { Track } from '../context/ProfileContext';
import { initialState } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

type RawTrack = {
  album: {
    mbid: string;
    '#text': string;
  };
  artist: {
    mbid: string;
    '#text': string;
  };
  date: {
    uts: string;
    '#text': string;
  };
  mbid: string;
  url: string;
  streamable: '0' | '1';
  name: string;
  image: {
    size: 'small' | 'medium' | 'large' | 'extralarge';
    '#text': string;
  }[];
  '@attr'?: {
    nowplaying: 'true';
  };
};

type Response = {
  recenttracks: {
    track: RawTrack[];
  };
};

export async function getRecentTracks(user: string): Promise<Track[]> {
  const endpoint = createBackendUrl('user.getRecentTracks', {
    user,
  });

  try {
    const response = await fetch(endpoint);
    const {
      recenttracks: { track },
    }: Response = await response.json();

    return track.map(({ artist, image, date, name, mbid }) => {
      const img = image.find(({ size }) => size === 'small');

      return {
        artist: artist['#text'],
        id: mbid,
        img: img?.['#text'] ?? '',
        timestamp: Number.parseInt(date.uts, 10),
        track: name,
      };
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return initialState.recentTracks;
  }
}

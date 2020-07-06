import { initialState, Track } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

export async function getLovedTracks(user: string): Promise<Track[]> {
  const endpoint = createBackendUrl('user.getLovedTracks', {
    limit: '200',
    user,
  });

  try {
    const response = await fetch(endpoint);
    const {
      lovedtracks: { track },
    } = await response.json();

    return track.map(({ artist, image, date, name, mbid }) => ({
      artist: artist.name,
      id: mbid,
      img: image.find(({ size }) => size === 'small')['#text'],
      timestamp: date.uts,
      track: name,
    }));
  } catch {
    return initialState.lovedTracks;
  }
}

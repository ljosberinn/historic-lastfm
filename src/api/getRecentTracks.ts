import { initialState, Track } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

export async function getRecentTracks(user: string): Promise<Track[]> {
  const endpoint = createBackendUrl('user.getRecentTracks', {
    user,
  });

  try {
    const response = await fetch(endpoint);
    const {
      recenttracks: { track },
    } = await response.json();

    return track.map(({ artist, image, date, name, mbid }) => ({
      artist: artist['#text'],
      id: mbid,
      img: image.find(({ size }) => size === 'small')['#text'],
      timestamp: date.uts,
      track: name,
    }));
  } catch {
    return initialState.recentTracks;
  }
}

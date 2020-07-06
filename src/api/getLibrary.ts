import { initialState } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

export async function getLibrary(user: string): Promise<string> {
  const endpoint = createBackendUrl('library.getArtists', {
    limit: '1',
    user,
  });

  try {
    const response = await fetch(endpoint);
    const json = await response.json();

    return json.artists['@attr'].total;
  } catch {
    return initialState.totalArtistAmount;
  }
}

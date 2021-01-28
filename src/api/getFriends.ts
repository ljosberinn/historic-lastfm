import type { Friend } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

export async function getFriends(name: string): Promise<Friend[]> {
  const endpoint = createBackendUrl('user.getFriends', {
    limit: '200',
    user: name,
  });

  try {
    const response = await fetch(endpoint);
    const {
      friends: { user },
    } = await response.json();

    // @ts-expect-error fix at some later point, typing the lfm api is silly
    return user.map(({ name, image, country, subscriber }) => ({
      country,
      // @ts-expect-error fix at some later point, typing the lfm api is silly
      img: image.find(({ size }) => size === 'small')['#text'],
      name,
      subscriber,
    }));
  } catch {
    return [];
  }
}

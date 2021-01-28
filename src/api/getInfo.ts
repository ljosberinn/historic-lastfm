import type { Profile } from '../context/ProfileContext';
import { initialState } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

type Info = {
  country: Profile['country'];
  img: Profile['img'];
  realName: Profile['realName'];
  name: Profile['name'];
  playlists: Profile['playlists'];
  totalPlayCount: Profile['totalPlayCount'];
  subscriber: Profile['subscriber'];
  registered: Profile['registered'];
};

export async function getInfo(name: string): Promise<Info> {
  const endpoint = createBackendUrl('user.getInfo', {
    user: name,
  });

  try {
    const response = await fetch(endpoint);
    const {
      user: {
        country,
        image,
        name,
        playlists,
        realname: realName,
        registered,
        subscriber,
        playcount: totalPlayCount,
      },
    } = await response.json();

    return {
      country,
      // @ts-expect-error fix at some later point, typing the lfm api is silly
      img: image.find(({ size }) => size === 'extralarge')['#text'],
      name,
      playlists,
      realName,
      registered: registered.unixtime,
      subscriber: subscriber > 0,
      totalPlayCount,
    };
  } catch {
    const {
      country,
      img,
      realName,
      name,
      playlists,
      totalPlayCount,
      subscriber,
      registered,
    } = initialState;

    return {
      country,
      img,
      name,
      playlists,
      realName,
      registered,
      subscriber,
      totalPlayCount,
    };
  }
}

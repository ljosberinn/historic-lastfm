import type { TopArtists } from '../context/ProfileContext';
import { initialState, Timespan } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

export async function getTopArtists(user: string): Promise<TopArtists> {
  try {
    const [
      sevenDays,
      oneMonth,
      threeMonths,
      sixMonths,
      twelveMonths,
      overall,
    ] = await Promise.all(
      Object.values(Timespan).map(async period => {
        const endpoint = createBackendUrl('user.getTopArtists', {
          limit: '10',
          period,
          user,
        });

        try {
          const response = await fetch(endpoint);
          const {
            topartists: { artist },
          } = await response.json();

          // @ts-expect-error fix at some later point, typing the lfm api is silly
          return artist.map(({ name, image, playcount }) => ({
            // @ts-expect-error fix at some later point, typing the lfm api is silly
            img: image.find(({ size }) => size === 'large')['#text'],
            name,
            playCount: playcount,
          }));
        } catch {
          return [];
        }
      })
    );

    return {
      [Timespan['12month']]: twelveMonths,
      [Timespan['1month']]: oneMonth,
      [Timespan['6month']]: sixMonths,
      [Timespan.overall]: overall,
      [Timespan['3month']]: threeMonths,
      [Timespan['7day']]: sevenDays,
    };
  } catch {
    return initialState.topArtists;
  }
}

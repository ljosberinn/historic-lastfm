import { TopTracks, initialState, Timespan } from '../context/ProfileContext';
import { createBackendUrl } from '../utils/api';

export async function getTopTracks(user: string): Promise<TopTracks> {
  try {
    const [
      sevenDays,
      oneMonth,
      threeMonths,
      sixMonths,
      twelveMonths,
      overall,
    ] = await Promise.all(
      Object.keys(Timespan).map(async (period: Timespan) => {
        const endpoint = createBackendUrl('user.getTopTracks', {
          limit: '15',
          period,
          user,
        });

        try {
          const response = await fetch(endpoint);
          const {
            toptracks: { track },
          } = await response.json();

          return track.map(({ artist, name, playcount }) => ({
            artist: artist.name,
            playCount: playcount,
            track: name,
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
    return initialState.topTracks;
  }
}

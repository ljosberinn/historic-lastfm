import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

import { getFriends } from '../../src/api/getFriends';
import { getInfo } from '../../src/api/getInfo';
import { getLibrary } from '../../src/api/getLibrary';
import { getLovedTracks } from '../../src/api/getLovedTracks';
import { getRecentTracks } from '../../src/api/getRecentTracks';
import { getTopArtists } from '../../src/api/getTopArtists';
import { getTopTracks } from '../../src/api/getTopTracks';
import { AboutMe } from '../../src/components/AboutMe';
import { Events } from '../../src/components/Events';
import { Friends } from '../../src/components/Friends';
import { Groups } from '../../src/components/Groups';
import { Library } from '../../src/components/Library';
import { ProfileBadge } from '../../src/components/ProfileBadge';
import { ProfileHeader } from '../../src/components/ProfileHeader';
import { ProfileOptions } from '../../src/components/ProfileOptions';
import { RecentActivity } from '../../src/components/RecentActivity';
import { RecentlyListenedTracks } from '../../src/components/RecentlyListenedTracks';
import { Shoutbox } from '../../src/components/Shoutbox';
import { TopArtists } from '../../src/components/TopArtists';
import { TopTracks } from '../../src/components/TopTracks';
import {
  initialState,
  ProfileContextProvider,
} from '../../src/context/ProfileContext';
import type { Profile as IProfile } from '../../src/context/ProfileContext';

dayjs.extend(relativeTime);

type ProfileProps = {
  profile: IProfile;
};

// eslint-disable-next-line import/no-default-export
export default function Profile({ profile }: ProfileProps): JSX.Element {
  return (
    <ProfileContextProvider value={profile}>
      <ProfileHeader />
      <div className="leftCol">
        <div className="leftColWrapper">
          <ProfileBadge />
          <ProfileOptions />
          <RecentlyListenedTracks />
          <Library />
          <TopArtists />
          <TopTracks />
          <Shoutbox />
        </div>
      </div>
      <div className="mpuTop rightCol">
        <AboutMe />
        <RecentActivity />
        <Friends />
        <Events />
        <Groups />
      </div>
    </ProfileContextProvider>
  );
}

export const getStaticPaths = (): GetStaticPathsResult => {
  return {
    fallback: true,
    paths: [
      {
        params: {
          name: 'XHS207GA',
        },
      },
    ],
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<ProfileProps>> => {
  if (!params || Array.isArray(params.name)) {
    return {
      props: {
        profile: initialState,
      },
    };
  }

  const name = (params.name ?? 'XHS207GA').toLowerCase();

  const friends = await getFriends(name);
  const info = await getInfo(name);
  const totalArtistAmount = await getLibrary(name);
  const lovedTracks = await getLovedTracks(name);
  const recentTracks = await getRecentTracks(name);
  const topArtists = await getTopArtists(name);
  const topTracks = await getTopTracks(name);

  const profile: IProfile = {
    ...initialState,
    ...info,
    friends,
    lovedTracks,
    recentTracks,
    topArtists,
    topTracks,
    totalArtistAmount,
  };

  return {
    props: {
      profile,
    },
    revalidate: 3 * 60,
  };
};

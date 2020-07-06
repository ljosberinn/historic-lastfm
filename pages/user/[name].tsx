import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { GetServerSideProps } from 'next';
import React from 'react';

import { getFriends } from '../../src/api/getFriends';
import { getInfo } from '../../src/api/getInfo';
import { getLibrary } from '../../src/api/getLibrary';
import { getLovedTracks } from '../../src/api/getLovedTracks';
import { getRecentTracks } from '../../src/api/getRecentTracks';
import { getTopArtists } from '../../src/api/getTopArtists';
import { getTopTracks } from '../../src/api/getTopTracks';
import AboutMe from '../../src/components/AboutMe';
import Events from '../../src/components/Events';
import Friends from '../../src/components/Friends';
import Groups from '../../src/components/Groups';
import Library from '../../src/components/Library';
import ProfileBadge from '../../src/components/ProfileBadge';
import ProfileHeader from '../../src/components/ProfileHeader';
import ProfileOptions from '../../src/components/ProfileOptions';
import RecentActivity from '../../src/components/RecentActivity';
import RecentlyListenedTracks from '../../src/components/RecentlyListenedTracks';
import Shoutbox from '../../src/components/Shoutbox';
import TopArtists from '../../src/components/TopArtists';
import TopTracks from '../../src/components/TopTracks';
import ProfileContextProvider, {
  initialState,
  Profile as IProfile,
} from '../../src/context/ProfileContext';

dayjs.extend(relativeTime);

interface ProfileProps {
  profile: IProfile;
}

const cache: { [key: string]: { profile: IProfile; ts: number } } = {};

export default function Profile(props: ProfileProps) {
  return (
    <ProfileContextProvider value={props.profile}>
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

const cacheisValid = (ts: number) => Date.now() - 24 * 60 * 60 * 1000 <= ts;

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ctx => {
  const name = ctx.query.name || 'XHS207GA';

  if (Array.isArray(name)) {
    return {
      props: {
        profile: initialState,
      },
    };
  }

  if (cache[name] && cacheisValid(cache[name].ts)) {
    return {
      props: {
        profile: cache[name].profile,
      },
    };
  }

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

  cache[name] = {
    profile,
    ts: Date.now(),
  };

  return {
    props: {
      profile,
    },
  };
};

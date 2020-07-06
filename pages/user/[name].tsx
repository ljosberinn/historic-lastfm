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
import {
  attachLambdaContext,
  attachComponentBreadcrumb,
} from '../../src/utils/sentry';

dayjs.extend(relativeTime);

interface ProfileProps {
  profile: IProfile;
}

const cache = new Map<string, { profile: IProfile; ts: number }>();

export default function Profile(props: ProfileProps) {
  attachComponentBreadcrumb('Profile');

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
  attachLambdaContext(ctx.req);

  if (Array.isArray(ctx.query.name)) {
    return {
      props: {
        profile: initialState,
      },
    };
  }

  const name = (ctx.query.name || 'XHS207GA').toLowerCase();

  if (cache.has(name)) {
    const { ts, profile } = cache.get(name);

    if (cacheisValid(ts)) {
      return {
        props: {
          profile,
        },
      };
    }
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

  cache.set(name, {
    profile,
    ts: Date.now(),
  });

  return {
    props: {
      profile,
    },
  };
};

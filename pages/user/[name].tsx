import React from 'react';
import ProfileHeader from '../../src/components/ProfileHeader';
import ProfileBadge from '../../src/components/ProfileBadge';
import ProfileOptions from '../../src/components/ProfileOptions';
import RecentlyListenedTracks from '../../src/components/RecentlyListenedTracks';
import Library from '../../src/components/Library';
import TopArtists from '../../src/components/TopArtists';
import TopTracks from '../../src/components/TopTracks';
import Shoutbox from '../../src/components/Shoutbox';
import AboutMe from '../../src/components/AboutMe';
import RecentActivity from '../../src/components/RecentActivity';
import Friends from '../../src/components/Friends';
import Groups from '../../src/components/Groups';
import Events from '../../src/components/Events';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ProfileContextProvider, {
  initialState,
  Profile as IProfile,
} from '../../src/context/ProfileContext';
import { GetServerSideProps } from 'next';
import { getFriends } from '../../src/api/getFriends';
import { getInfo } from '../../src/api/getInfo';
import { getLibrary } from '../../src/api/getLibrary';
import { getLovedTracks } from '../../src/api/getLovedTracks';
import { getRecentTracks } from '../../src/api/getRecentTracks';
import { getTopArtists } from '../../src/api/getTopArtists';
import { getTopTracks } from '../../src/api/getTopTracks';

dayjs.extend(relativeTime);

interface ProfileProps {
  profile: IProfile;
}

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

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ctx => {
  const name = ctx.query.name || 'XHS207GA';

  if (Array.isArray(name)) {
    return {
      props: {
        profile: initialState,
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

  return {
    props: {
      profile: {
        ...initialState,
        friends,
        ...info,
        totalArtistAmount,
        lovedTracks,
        recentTracks,
        topArtists,
        topTracks,
      },
    },
  };
};

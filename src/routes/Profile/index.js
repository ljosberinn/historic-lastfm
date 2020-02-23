import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';

import { createFrontendUrl } from '../../utils/api';
import Friends from './Friends';
import Library from './Library';
import ProfileBadge from './ProfileBadge';
import ProfileHeader from './ProfileHeader';
import ProfileOptions from './ProfileOptions';
import RecentlyListenedTracks from './RecentlyListenedTracks';

export const ProfileContext = createContext(null);

dayjs.extend(relativeTime);

const initialState = {
  name: undefined,
  recentTracks: [],
  lovedTracks: [],
  country: undefined,
  realName: undefined,
  registered: undefined,
  totalPlayCount: undefined,
  img: undefined,
  subscriber: false,
  playlists: undefined,
  topArtists: [],
  friends: [],
};

export default function Profile() {
  const { name } = useParams();

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    Promise.all([
      fetch(createFrontendUrl('user.getInfo', { name })),
      fetch(createFrontendUrl('user.getRecentTracks', { name })),
      fetch(createFrontendUrl('user.getLovedTracks', { name })),
      fetch(createFrontendUrl('user.getFriends', { name })),
      fetch(createFrontendUrl('user.getTopArtists', { name })),
    ])

      .then(responses =>
        Promise.all(responses.map(response => response.json())),
      )

      .then(([info, recentTracks, lovedTracks, friends, topArtists]) => {
        setProfile({
          recentTracks,
          lovedTracks,
          friends,
          topArtists,
          ...info,
        });
      })
      .catch(console.error);
  }, [name]);

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileHeader />
      <div className="leftCol">
        <div className="leftColWrapper">
          <ProfileBadge />
          <ProfileOptions />

          <RecentlyListenedTracks />
          <Library />
        </div>
      </div>
      <div className="mpuTop rightCol">
        <Friends />
      </div>
    </ProfileContext.Provider>
  );
}

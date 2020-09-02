import { useContext } from 'react';

import { Profile, ProfileContext } from '../context/ProfileContext';

export function useProfile(): Profile {
  return useContext(ProfileContext);
}

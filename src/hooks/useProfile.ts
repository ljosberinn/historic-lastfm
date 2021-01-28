import { useContext } from 'react';

import type { Profile } from '../context/ProfileContext';
import { ProfileContext } from '../context/ProfileContext';

export function useProfile(): Profile {
  return useContext(ProfileContext);
}

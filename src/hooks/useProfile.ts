import { useContext } from 'react';

import { ProfileContext } from '../context/ProfileContext';

export default function useProfile() {
  return useContext(ProfileContext);
}

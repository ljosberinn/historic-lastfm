import { useContext } from 'react';

import { ProfileContext } from '../routes/Profile';

export default function useProfile() {
  return useContext(ProfileContext);
}

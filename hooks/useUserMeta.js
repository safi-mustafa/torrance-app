import { useEffect, useState } from 'react';
import { getKey } from '../utility';

export default function useUserMeta() {
  const [userMeta, setUserMeta] = useState(null);
  useEffect(() => {
    async function fetchUserMeta() {
      try {
        let userMeta = await getKey("user");
        const { userDetail, token } = JSON.parse(userMeta);
        setUserMeta({...userDetail, token});
      } catch (e) {
        console.warn(e);
        setUserMeta(null)
      }
    }

    fetchUserMeta();
  }, []);

  return {userMeta, role: userMeta?.role};
}

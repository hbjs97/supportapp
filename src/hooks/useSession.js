import { useCallback } from "react";

export default function useSession() {
  const UID_KEY = "@uid";

  const setUid = useCallback(
    (uid) => {
      localStorage.setItem(UID_KEY, uid);
    },
    [localStorage]
  );

  const getUid = useCallback(() => {
    return localStorage.getItem(UID_KEY);
  }, [localStorage]);

  return {
    setUid,
    getUid,
  };
}

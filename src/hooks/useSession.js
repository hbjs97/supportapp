import { useCallback } from "react";

export default function useSession() {
  const UID_KEY = "@uid";

  const setUid = useCallback(
    (uid) => {
      sessionStorage.setItem(UID_KEY, uid);
    },
    [sessionStorage]
  );

  const getUid = useCallback(() => {
    return sessionStorage.getItem(UID_KEY);
  }, [sessionStorage]);

  return {
    setUid,
    getUid,
  };
}

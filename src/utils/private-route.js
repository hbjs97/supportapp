import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "src/hooks/store/useUser";

export const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useUser();

  const isLoggedIn = !!user.id;

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.clear();
      router.push("/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <></>;
  }

  return children;
};

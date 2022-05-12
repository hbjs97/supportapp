import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "src/store/user/actions";

export default function useUser() {
  const user = useSelector((root) => root.userReducer.user);

  const dispatch = useDispatch();

  const __updateUserFromHooks = useCallback((diff) => dispatch(updateUser(diff)), [dispatch]);

  return {
    user,
    __updateUserFromHooks,
  };
}

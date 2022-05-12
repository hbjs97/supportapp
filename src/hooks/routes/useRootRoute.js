import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRootRoute } from "src/store/routes/rootRoute/actions";

export default function useRootRoute() {
  const root = useSelector((root) => root.rootRouteReducer.root);

  const dispatch = useDispatch();

  const __updateRootFromHooks = useCallback((diff) => dispatch(updateRootRoute(diff)), [dispatch]);

  return {
    root,
    __updateRootFromHooks,
  };
}

import { Box, Container, Grid } from "@mui/material";
import produce from "immer";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import GoogleMap from "src/components/dashboard/google-map";
import MapSearchToolbar from "src/components/dashboard/map-search-toolbar";
import useToken from "src/hooks/useToken";
import { apiRoute, RequestGet } from "src/utils/fetch-api";
import { PrivateRoute } from "src/utils/private-route";
import { DashboardLayout } from "../components/dashboard-layout";

const Map = () => {
  const { getAccessToken } = useToken();
  const [malls, setMalls] = useState([]);
  const [query, setQuery] = useState({ q: undefined });
  const [center, setCenter] = useState({ lat: 37.56667, lng: 126.978 });

  const handleChangeCenter = useCallback(
    ({ lat, lng }) => {
      setCenter({ lat, lng });
    },
    [center]
  );

  const handleQueryChange = useCallback(
    (event) => {
      setQuery({ q: event.target.value });
    },
    [query]
  );

  const handleChangeBookmark = useCallback(
    (id) => {
      const nextMalls = produce(malls, (draft) => {
        const mall = draft.find((v) => v.id === id);
        mall.isBookmark = !mall.isBookmark;
      });
      setMalls(nextMalls);
    },
    [malls]
  );

  console.log(malls);

  const getMalls = useCallback(async () => {
    const {
      data,
      config: { status },
    } = await RequestGet(`${apiRoute.mall.getMalls}?${qs.stringify(query)}`, {}, getAccessToken());
    if (status === 200) {
      setMalls(data);
    }
  }, [query]);

  useEffect(() => {
    getMalls();
  }, [query]);

  return (
    <PrivateRoute>
      <Box component="main" sx={{ flexGrow: 1, py: 8, px: 6 }}>
        <Container maxWidth={true}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <GoogleMap items={malls} center={center} onChangeBookmark={handleChangeBookmark} />
            </Grid>
            <Grid item xs={4}>
              <MapSearchToolbar
                onChange={handleQueryChange}
                onClick={handleChangeCenter}
                malls={malls}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PrivateRoute>
  );
};

Map.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Map;

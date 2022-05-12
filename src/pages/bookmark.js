import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { MallCard } from "src/components/mall/mall-card";
import useToken from "src/hooks/useToken";
import { apiRoute, RequestGet } from "src/utils/fetch-api";
import { DashboardLayout } from "../components/dashboard-layout";
import { MallToolbar } from "../components/mall/mall-toolbar";

const Bookmark = () => {
  const [malls, setMalls] = useState([]);
  const { getAccessToken } = useToken();

  const getMyMalls = async () => {
    const {
      data,
      config: { status },
    } = await RequestGet(apiRoute.mall.getBookmarkedMalls, {}, getAccessToken());
    if (status !== 200) {
      alert("매장 목록 조회 실패");
      return;
    }
    setMalls(data);
  };

  useEffect(() => {
    getMyMalls();
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <MallToolbar hideButton={true} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {malls.map((mall) => (
                <Grid item key={mall.id} lg={4} md={6} xs={12}>
                  <MallCard mall={mall} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Bookmark.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Bookmark;

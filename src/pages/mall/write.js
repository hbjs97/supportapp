import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import AddressGeo from "src/components/address/address-geo";
import { DashboardLayout } from "src/components/dashboard-layout";
import useToken from "src/hooks/useToken";
import { apiRoute, RequestMultiPartPost } from "src/utils/fetch-api";

const Input = styled("input")({
  display: "none",
});

const WriteMall = () => {
  const router = useRouter();
  const { getAccessToken } = useToken();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    name: null,
    phone: null,
    address: null,
    addressDetail: null,
    latitude: null,
    longitude: null,
    remark: null,
    openAt: null,
    closeAt: null,
    thumbnail: {
      file: null,
      virtualUrl: null,
    },
  });

  const handleChange = useCallback(
    (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    },
    [values]
  );

  const handleChangeAddress = useCallback(
    ({ address, x, y }) => {
      setValues({
        ...values,
        address,
        longitude: x,
        latitude: y,
      });
      setIsOpen(false);
    },
    [values]
  );

  const handleUploadFile = useCallback(
    (event) => {
      const newImage = event.target?.files?.[0];
      if (newImage) {
        setValues({
          ...values,
          [event.target.name]: {
            file: newImage,
            virtualUrl: URL.createObjectURL(newImage),
          },
        });
      }
    },
    [values]
  );

  const onClickAddMall = useCallback(async () => {
    const { thumbnail, ...rest } = values;
    const formData = new FormData();
    Object.keys(rest).forEach((key) => {
      rest[key] && formData.append(key, rest[key]);
    });
    thumbnail?.file && formData.append("thumbnail", thumbnail.file);

    const {
      data,
      config: { status },
    } = await RequestMultiPartPost(apiRoute.mall.enrollMall, formData, getAccessToken());
    if (status !== 201) {
      alert("매장 등록 실패");
      return;
    }
    router.back();
  }, [values]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Add mall
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={values.thumbnail.virtualUrl}
                      sx={{
                        height: 256,
                        width: 256,
                      }}
                      variant="square"
                    />
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" fullWidth variant="text" component="label">
                    Upload thumbnail
                    <Input
                      name="thumbnail"
                      id="contained-button-file"
                      type="file"
                      onChange={handleUploadFile}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <form autoComplete="off" noValidate>
                <Card>
                  <CardHeader subheader="The information about mall" title="Mall Profile" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          onChange={handleChange}
                          required
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          onChange={handleChange}
                          required
                          type="number"
                          value={values.phone}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          onClick={() => setIsOpen(true)}
                          required
                          focused
                          value={values.address}
                          variant="outlined"
                          sx={{
                            "& .css-igzd9l-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor: "#E6E8F0",
                              },
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Address Detail"
                          name="addressDetail"
                          onChange={handleChange}
                          value={values.addressDetail}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Remark"
                          name="remark"
                          onChange={handleChange}
                          value={values.remark}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="OpenAt"
                          name="openAt"
                          onChange={handleChange}
                          helperText={"HH:MM 24hour format"}
                          required
                          value={values.openAt}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="CloseAt"
                          name="closeAt"
                          onChange={handleChange}
                          helperText={"HH:MM 24hour format"}
                          required
                          value={values.closeAt}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      p: 2,
                    }}
                  >
                    <Button color="primary" variant="contained" onClick={onClickAddMall}>
                      Add mall
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <AddressGeo isOpen={isOpen} onClose={() => setIsOpen(false)} onClick={handleChangeAddress} />
    </>
  );
};

WriteMall.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default WriteMall;

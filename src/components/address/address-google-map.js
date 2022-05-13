import { Box, Button, Container, Divider, Grid, TextField } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const AddressGoogleMap = (props) => {
  const { onChange, onClose } = props;
  const [cursor, setCursor] = useState({ x: 126.978, y: 37.56667 });
  const [address, setAddress] = useState({ address: "" });

  const handleChangeCursor = useCallback(
    ({ x, y }) => {
      setCursor({ x, y });
    },
    [cursor]
  );

  const handleChangeAddress = useCallback(
    (event) => {
      setAddress({
        ...address,
        [event.target.name]: event.target.value,
      });
    },
    [address]
  );

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: "600px" }}
        center={{ lat: cursor.y, lng: cursor.x }}
        zoom={10}
        onClick={(event) => handleChangeCursor({ x: event.latLng.lng(), y: event.latLng.lat() })}
      >
        <Marker key={1} position={{ lat: cursor.y, lng: cursor.x }} />
      </GoogleMap>
      <Divider sx={{ py: 1 }} />
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Container maxWidth>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                required
                onChange={handleChangeAddress}
                value={address.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  if (!cursor.x || !cursor.y) {
                    alert("마커를 지정해주세요.");
                  }
                  if (!address.address) {
                    alert("주소를 입력해주세요.");
                  }
                  onChange({ ...address, ...cursor });
                  onClose();
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LoadScript>
  );
};

export default AddressGoogleMap;

import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { GoogleMap as GoogleMapRoot, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import useToken from "src/hooks/useToken";
import { markerUrl } from "src/icons/marker";
import { apiRoute, RequestDelete, RequestPost } from "src/utils/fetch-api";

const GoogleMap = (props) => {
  const { items, center, onChangeBookmark } = props;
  const { getAccessToken } = useToken();
  const [selectedMallId, setSelectedMallId] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const markerClickHandler = (event, id) => {
    setSelectedMallId(id);

    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };

  const bookmark = useCallback(
    async (mall) => {
      const {
        data,
        config: { status },
      } = mall.isBookmark
        ? await RequestDelete(`${apiRoute.bookmark}/${mall.id}`, getAccessToken())
        : await RequestPost(`${apiRoute.bookmark}/${mall.id}`, {}, {}, getAccessToken());
      if (status !== 202) {
        alert(data?.message);
        return;
      }
      onChangeBookmark(mall.id);
    },
    [items]
  );

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMapRoot mapContainerStyle={{ height: "100%" }} center={center} zoom={10}>
        {Array.isArray(items) &&
          items.map((v) => (
            <Marker
              key={v.id}
              position={{ lat: v.lat, lng: v.lng }}
              icon={{ url: v.isOpen ? markerUrl.dot.red : markerUrl.dot.blue }}
              onClick={(event) => markerClickHandler(event, v.id)}
            >
              {infoOpen && selectedMallId === v.id && (
                <>
                  <InfoWindow position={{ lat: v.lat, lng: v.lng }}>
                    <div>
                      <h2>{v.name}</h2>
                      <body>{v.address}</body>
                      <div>{v.addressDetail}</div>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch checked={v.isBookmark} onClick={() => bookmark(v)} />}
                          label="북마크"
                        />
                      </FormGroup>
                    </div>
                  </InfoWindow>
                </>
              )}
            </Marker>
          ))}
      </GoogleMapRoot>
    </LoadScript>
  );
};

export default GoogleMap;

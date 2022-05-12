import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const MallCardMap = ({ mall, onClick, ...rest }) => (
  <Card
    onClick={() => onClick({ lat: mall.lat, lng: mall.lng })}
    sx={{
      display: "flex",
      height: "160px",
      "&:hover": {
        background: "#f1f1f1",
      },
    }}
    {...rest}
  >
    <CardMedia
      component="img"
      sx={{ width: "30%", objectFit: "contain", padding: 2 }}
      image={mall.thumbnail}
    />
    <Box sx={{ width: "70%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <CardContent sx={{ justifyContent: "center", alignItems: "center", padding: 1 }}>
        <Typography align="center" color="textPrimary" variant="h5" noWrap>
          {mall.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2" noWrap>
          {mall.address}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1" noWrap>
          {mall.remark}
        </Typography>
      </CardContent>
    </Box>
  </Card>
);

MallCardMap.propTypes = {
  mall: PropTypes.object.isRequired,
};

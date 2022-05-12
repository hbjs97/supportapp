import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Clock as ClockIcon } from "../../icons/clock";
import { Lock as LockIcon } from "../../icons/lock";

export const MallCard = ({ mall, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <Avatar alt="mall" src={mall.thumbnail} variant="square" />
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {mall.name}
      </Typography>
      <Typography align="center" color="textPrimary" variant="subtitle2">
        {mall.address}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {mall.remark}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <ClockIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {`${mall.openAt} ~ ${mall.closeAt}`}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          {!mall.isOpen && <LockIcon color="action" />}
        </Grid>
      </Grid>
    </Box>
  </Card>
);

MallCard.propTypes = {
  mall: PropTypes.object.isRequired,
};

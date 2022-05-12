import { Box, Card, Grid } from "@mui/material";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MallCardMap } from "./mall-card-map";

export const MallListResults = (props) => {
  const { malls, onClick } = props;
  return (
    <Card>
      <PerfectScrollbar>
        <Box maxWidth>
          {malls.map((mall) => (
            <Grid item key={mall.id} maxWidth>
              <MallCardMap mall={mall} onClick={onClick} />
            </Grid>
          ))}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

MallListResults.propTypes = {
  malls: PropTypes.array.isRequired,
};

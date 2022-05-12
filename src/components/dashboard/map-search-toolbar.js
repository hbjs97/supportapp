import { Box, Container } from "@mui/material";
import { MallListResults } from "../mall/mall-list-result";
import MallListToolbar from "../mall/mall-list-toolbar";

const MapSearchToolbar = (props) => {
  const { onChange, onClick, malls } = props;
  return (
    <>
      <Box
        component="main"
        width="100%"
        sx={{ flexGrow: 1, height: "calc(100vh - 280px)", overflowY: "auto" }}
      >
        <Container maxWidth>
          <MallListToolbar onChange={onChange} />
          <Box maxWidth sx={{ mt: 3 }}>
            <MallListResults malls={malls} onClick={onClick} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MapSearchToolbar;

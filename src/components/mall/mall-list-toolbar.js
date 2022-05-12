import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

const MallListToolbar = (props) => {
  const { onChange } = props;

  return (
    <Box>
      <Card>
        <CardContent>
          <Box maxWidth>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              onChange={onChange}
              placeholder="Search mall"
              variant="outlined"
              autoFocus
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MallListToolbar;

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const MallToolbar = (props) => {
  const { hideButton, ...rest } = props;
  const router = useRouter();

  return (
    <Box {...rest}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Malls
        </Typography>
        {!hideButton && (
          <Box sx={{ m: 1 }}>
            <Button color="primary" variant="contained" onClick={() => router.push("/mall/write")}>
              Add mall
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

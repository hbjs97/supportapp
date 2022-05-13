import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Backdrop, Box, Fade, Modal, Paper, Tab } from "@mui/material";
import { useCallback, useState } from "react";
import AddressGoogleMap from "./address-google-map";
import AddressSearchKakao from "./address-search-kakao";

const AddressGeo = (props) => {
  const { isOpen, onClose, onChange } = props;
  const [labValue, setLabValue] = useState("1");
  const handleChange = useCallback(
    (event, newValue) => {
      setLabValue(newValue);
    },
    [labValue]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            maxHeight: "80vh",
            overflowY: "scroll",
            bgcolor: "white",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "3px",
            boxShadow: "5",
            margin: "15px",
            outline: "none",
          }}
        >
          <Paper sx={{ padding: "15px", boxShadow: 0 }}>
            <Box>
              <TabContext value={labValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Search" value="1" />
                    <Tab label="Pick" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ paddingX: 0 }}>
                  <AddressSearchKakao onChange={onChange} onClose={onClose} />
                </TabPanel>
                <TabPanel value="2" sx={{ paddingX: 0 }}>
                  <AddressGoogleMap onChange={onChange} onClose={onClose} />
                </TabPanel>
              </TabContext>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddressGeo;

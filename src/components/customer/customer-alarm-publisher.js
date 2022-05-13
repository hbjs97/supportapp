import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "src/components/dashboard-layout";
import useToken from "src/hooks/useToken";
import { apiRoute, RequestPost } from "src/utils/fetch-api";

const CustomerAlarmPublisher = (props) => {
  const { isOpen, onClose, selectedCustomerIds } = props;
  const { getAccessToken } = useToken();
  const [values, setValues] = useState({
    title: null,
    content: null,
    receiveUserIds: null,
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

  const onClickSendMail = useCallback(async () => {
    const {
      data,
      config: { status },
    } = await RequestPost(apiRoute.user.publish, values, {}, getAccessToken());
    if (status !== 200) {
      alert("알람 발송 실패");
      return;
    }
    onClose();
  }, [values]);

  useEffect(() => {
    setValues({ ...values, receiveUserIds: selectedCustomerIds });
  }, [selectedCustomerIds]);

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
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            maxHeight: "80vh",
            bgcolor: "white",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "3px",
            boxShadow: "5",
            margin: "15px",
            outline: "none",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form autoComplete="off" noValidate>
                <Card>
                  <CardHeader subheader="Publish alarm to customers" title="Send Alarm" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Title"
                          name="title"
                          onChange={handleChange}
                          required
                          value={values.title}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Content"
                          name="content"
                          onChange={handleChange}
                          required
                          value={values.content}
                          variant="outlined"
                          multiline
                          rows="10"
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
                    <Button color="primary" variant="contained" onClick={onClickSendMail}>
                      Publish
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

CustomerAlarmPublisher.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CustomerAlarmPublisher;

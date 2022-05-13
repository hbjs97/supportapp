import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Upload as UploadIcon } from "src/icons/upload";
import CustomerAlarmPublisher from "./customer-alarm-publisher";

export const CustomerListToolbar = (props) => {
  const { selectedCustomerIds, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onClickSendBtn = () => {
    if (!selectedCustomerIds.length) {
      alert("알람 수신자를 체크해주세요.");
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
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
            Customers
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<UploadIcon fontSize="small" />}
              sx={{ mr: 1 }}
              onClick={onClickSendBtn}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
      <CustomerAlarmPublisher
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedCustomerIds={selectedCustomerIds}
      />
    </>
  );
};

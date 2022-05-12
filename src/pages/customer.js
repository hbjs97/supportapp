import { Box, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useToken from "src/hooks/useToken";
import { apiRoute, RequestGet } from "src/utils/fetch-api";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Customers = () => {
  const { getAccessToken } = useToken();
  const [customers, setCustomers] = useState([]);

  const getMyCustomers = useCallback(async () => {
    const {
      data,
      config: { status },
    } = await RequestGet(apiRoute.user.subscribers, {}, getAccessToken());
    if (status === 200) {
      setCustomers(data.data);
    }
  }, []);

  useEffect(() => {
    getMyCustomers();
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;

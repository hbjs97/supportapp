import { Box, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useToken from "src/hooks/useToken";
import { apiRoute, RequestGet } from "src/utils/fetch-api";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Customers = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { getAccessToken } = useToken();

  const getMyCustomers = useCallback(async () => {
    const {
      data,
      config: { status },
    } = await RequestGet(apiRoute.user.subscribers, {}, getAccessToken());
    if (status === 200) {
      setCustomers(data.data);
    }
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

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
          <CustomerListToolbar selectedCustomerIds={selectedCustomerIds} />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults
              customers={customers}
              handleSelectAll={handleSelectAll}
              handleSelectOne={handleSelectOne}
              selectedCustomerIds={selectedCustomerIds}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;

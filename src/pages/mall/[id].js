import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { DashboardLayout } from "src/components/dashboard-layout";

const Product = () => {
  const router = useRouter();
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      ></Box>
    </>
  );
};

Product.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Product;

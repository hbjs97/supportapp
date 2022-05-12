import { Box, Button, Container, FormHelperText, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { apiRoute, RequestPost } from "src/utils/fetch-api";
import * as Yup from "yup";

const states = [
  {
    value: "USER",
    label: "소비자",
  },
  {
    value: "MERCHANT",
    label: "소상공인",
  },
];

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      role: states[0].value,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("First name is required"),
      password: Yup.string().max(255).required("Password is required"),
      phone: Yup.string()
        .matches(/^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/, "Phone is not valid")
        .max(11),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => onRegisterBtnClicked(values),
  });

  const onRegisterBtnClicked = useCallback(
    async (values) => {
      const {
        data,
        config: { status },
      } = await RequestPost(apiRoute.auth.register, values);
      if (status === 201) {
        router.push("/login");
      } else {
        alert(data?.message);
      }
    },
    [formik.values]
  );

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone Number"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="phone"
              value={formik.values.phone}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.role && formik.errors.role)}
              fullWidth
              helperText={formik.touched.role && formik.errors.role}
              label="Role"
              margin="normal"
              name="role"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              select
              SelectProps={{ native: true }}
              value={formik.values.role}
              variant="outlined"
            >
              {states.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            ></Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;

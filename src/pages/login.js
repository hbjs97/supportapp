import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import useUser from "src/hooks/store/useUser";
import useToken from "src/hooks/useToken";
import { apiRoute, RequestPost } from "src/utils/fetch-api";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();
  const { __updateUserFromHooks } = useUser();
  const { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } = useToken();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => onLoginBtnClicked(values.email, values.password),
  });

  const checkSessionToken = useCallback(() => {
    if (getAccessToken() && getRefreshToken()) {
      router.push("/");
    }
  }, [getAccessToken, getRefreshToken]);

  const onLoginBtnClicked = useCallback(
    async (email, password) => {
      const {
        data,
        config: { status },
      } = await RequestPost(apiRoute.auth.login, { email, password });

      if (status === 200) {
        setAccessToken(data.tokenPayload.accessToken);
        setRefreshToken(data.tokenPayload.refreshToken);

        __updateUserFromHooks(data.tokenizedUserPayloadDto);
        router.push("/");
      } else {
        alert("아이디 또는 비밀번호가 다릅니다");
      }
    },
    [formik.values.email, formik.values.password, __updateUserFromHooks]
  );

  useEffect(() => {
    checkSessionToken();
  }, [checkSessionToken]);

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
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
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
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;

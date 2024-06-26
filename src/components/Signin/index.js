import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { successToast, errorToast, warningToast } from "utilities/toast";
import { ROLES } from "../../enum";
import { signinService } from "api/auth";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "redux/slices/userSlice";
import { gapi } from "gapi-script";
import GGLogin from "./GGlogin";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const clientId = "753324609964-v61bfjuttptp0l40ia95p0kkpt5p0ovg.apps.googleusercontent.com"

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reditectToSignUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  }
  const handleLogin = async (username, password) => {
    try {
      const res = await signinService(username, password);
      // console.log("accessToken1", res.data.token);
      localStorage.setItem("accessToken", res.data.token);
      localStorage.setItem("id", res.data.id);
      if (res.data.role === "ADMIN") {
        localStorage.setItem("role", 0);
      }
      if (res.data.role === "MERCHANT") {
        localStorage.setItem("role", 1);
      }
      if (res.data.role === "USER") {
        localStorage.setItem("role", 2);
      }

      if (res?.status === 200) {
        localStorage.setItem("hadCart", false);
        localStorage.setItem("orderProductId", "")
        // console.log("localstorage>>>", localStorage.getItem("hadCart"));
        successToast("Login successful");
        const payload = {
          token: res.data.token,
          role: res.data.role,
          name: res.data.name,
          id: res.data.id,
          avatar: res.data.avatar,
          email: res.data.email,
          phone: res.data.phone,
        };
        // console.log("payload>>>>>>>>>", payload);
        dispatch(setUser(payload));

        const role = res.data.role;
        redirectAfterLogin(
          role === "ADMIN" ? 0 : role === "MERCHANT" ? 1 : 2
        );
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        errorToast(error.response.data.message || "Login failed");
      }
    }
  };

  const redirectAfterLogin = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        navigate("/admin"); // Sử dụng history.push để điều hướng
        break;
      case ROLES.MERCHANT:
        navigate("/merchant"); // Sử dụng history.push để điều hướng
        break;
      case ROLES.USER:
        navigate("/marketplace"); // Sử dụng history.push để điều hướng
        break;
      default:
        warningToast("You are not authorized to access this page");
        navigate("/marketplace"); // Sử dụng history.push để điều hướng
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    await handleLogin(username, password);
  };

  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load('client:auth2', start)
  })



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GGLogin />
            </div>
            {/* <GGLogout /> */}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2" onClick={reditectToSignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

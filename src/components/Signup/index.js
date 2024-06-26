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
import { useLocation } from "react-router-dom";
import { signupService } from "api/auth";
import { successToast, errorToast } from "utilities/toast";
import { useNavigate } from "react-router-dom";
import GGLogin from "components/Signin/GGlogin";
import { gapi } from "gapi-script";
import GGLogout from "components/Signin/GGlogout";

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

export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [isSeller, setIsSeller] = React.useState(false);
  const navigate = useNavigate();

  const validation = () => {
    if (!username || !password || !name)
      return false;
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      errorToast("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      const response = await signupService(name, address, username, password, isSeller);
      // console.log("response", response);
      if (response?.status === 200 && response?.data?.message === "User registration was successful") {
        successToast("Đăng ký thành công !!! Quý khách vui lòng đăng nhập để sử dụng dịch vụ");
        navigate("/signin");
      }
      if (response?.status === 200 && response?.data?.message === "User already exist") {
        errorToast("Tài khoản này đã tồn tại");
      }
    } catch (error) {
      console.log(error);
      errorToast("Đăng ký không thành công !!!");
    }
  };

  const reditectToSignIn = (event) => {
    event.preventDefault();
    navigate("/signin");
  }

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="address"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  autoFocus
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={true} color="primary" />}
                  label="Do you want to become a seller?"
                  value={isSeller}
                  onChange={(e) => setIsSeller(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GGLogin />
            </div>
            {/* <GGLogout /> */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="" variant="body2" onClick={reditectToSignIn}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

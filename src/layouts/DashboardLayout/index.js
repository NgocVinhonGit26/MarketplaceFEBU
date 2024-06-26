import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Link as RouterLink } from "react-router-dom";

//temp
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StoreIcon from "@mui/icons-material/Store";
import TourIcon from "@mui/icons-material/Tour";
import HomeIcon from '@mui/icons-material/Home';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';


import { signoutService } from "api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUserDefault } from "redux/slices/userSlice";
import { successToast } from "utilities/toast";
import { getShopBoatByIdUser } from "api/shopBoat";

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const AdminListItems = ({ handleLogout, handleRedirectToHomepage }) => {
  return (
    <React.Fragment>
      <ListItemButton component={RouterLink} to="/admin">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/admin/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="QL người dùng" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/admin/shops">
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="QL thuyền buôn" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/admin/product">
        <ListItemIcon>
          <LocalMallIcon />
        </ListItemIcon>
        <ListItemText primary="QL sản phẩm" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/admin/tour-orders">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Đơn đặt tour" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/admin/tours">
        <ListItemIcon>
          <TourIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý tour" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/admin/reports">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="TK Báo cáo" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      <ListItemButton onClick={handleRedirectToHomepage}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Trang chủ" />
      </ListItemButton>
    </React.Fragment>
  );
};




const MerchantListItems = ({ handleLogout, handleRedirectToHomepage }) => {
  return (
    <React.Fragment>
      <ListItemButton component={RouterLink} to="/merchant">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/merchant/products">
        <ListItemIcon>
          <LocalMallIcon />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/merchant/orders">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Đơn hàng" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/merchant/report">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Báo cáo DT" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      <ListItemButton onClick={handleRedirectToHomepage}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Trang chủ" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/merchant/payfee">
        <ListItemIcon>
          <QrCodeScannerIcon />
        </ListItemIcon>
        <ListItemText primary="Đóng phí" />
      </ListItemButton>


    </React.Fragment>
  );
};

export default function DashboardLayout({ children, layoutRole }) {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const accessToken = localStorage.getItem("accessToken")

  useLayoutEffect(() => {
    const checkRole = async () => {
      // console.log("cookies >>>>>>", cookies);
      // console.log("cookies.access_token >>>>>>", cookies.access_token)
      if (cookies.access_token) {
        const { id, role } = jwt_decode(cookies.access_token);
        if (
          (role === 0 && layoutRole === 1) ||
          (role === 1 && layoutRole === 0)
        ) {
          navigate(role === 0 ? "/merchant" : "/admin");
        } else if (role === 2) {
          navigate("/marketplace");
        }
        if (role === 1) {
          const response = await getShopBoatByIdUser(id, accessToken);
          if (response) {
            localStorage.setItem("shopBoatId", response.data.data._id);
          }
        }
      } else {
        // navigate("/signin");
      }
    };
    checkRole();
  }, [cookies.access_token, navigate]);

  const handleLogout = async () => {
    try {
      const response = await signoutService(token);
      if (response?.status === 200) {
        dispatch(setUserDefault());
        localStorage.removeItem("accessToken");
        successToast("Đăng xuất thành công !")
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirectToHomepage = () => {

    navigate('/');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {layoutRole === 0 ? (
              <AdminListItems
                handleLogout={handleLogout}
                handleRedirectToHomepage={handleRedirectToHomepage}
              />
            ) : (
              <MerchantListItems
                handleLogout={handleLogout}
                handleRedirectToHomepage={handleRedirectToHomepage}
              />
            )}
            <Divider sx={{ my: 1 }} />
            {layoutRole === 0 ? secondaryListItems : null}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

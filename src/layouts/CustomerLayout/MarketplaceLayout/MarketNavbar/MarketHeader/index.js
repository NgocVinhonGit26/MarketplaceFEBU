import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const pages = [
  "DU LỊCH",
  "BLOG",
  "KHUYẾN MÃI",
  "HƯỚNG DẪN ĐẶT HÀNG",
  "LIÊN HỆ",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "235px",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              backgroundColor: "#7DB249",
              height: "50px",
            }}
          >
            <IconButton
              size="small"
              edge="start"
              color="white"
              aria-label="menu"
              sx={{ mx: 1 }}
            >
              <MenuIcon style={{ color: "#fff" }} size="small" />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Arial",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#fff",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <span className="tracking-normal	">SẢN PHẨM</span>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <div key={page}>
                <Button
                  key={page}
                  //check index
                  onMouseEnter={index === 0 ? handleOpenUserMenu : undefined}
                  sx={{ py: 2, color: "white", display: "block" }}
                  style={{
                    color: "#E1EDDA",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    padding: "0 1rem",
                  }}
                >
                  {index === 0 ? (
                    <Link
                      to="/tour"
                      style={{ textDecoration: "none", color: "#E1EDDA" }}
                    >
                      <span className="tracking-normal	">{page}</span>
                    </Link>
                  ) : (
                    <span className="tracking-normal	">{page}</span>
                  )}
                </Button>
                {/* <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu> */}
              </div>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

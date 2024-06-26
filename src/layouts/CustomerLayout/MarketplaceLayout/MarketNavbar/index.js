import "./style.scss";
import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import ResponsiveAppBar from "./MarketHeader";
import "react-slideshow-image/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDefault } from "redux/slices/userSlice";
import { signoutService } from "api/auth";
import { successToast } from "utilities/toast";
import { resetListOderProduct } from "redux/slices/listOrderProductSlice";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'


const MarketNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const username = useSelector((state) => state.user.name);
  const token = useSelector((state) => state.user.token);
  const avatar = useSelector((state) => state.user.avatar);
  // console.log("token>>>>", token);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const navigate = useNavigate();

  useEffect(() => {
    if (username === "") {
      setIsSignedIn(false);
    } else {
      setIsSignedIn(true);
    }
  }, [username]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleNavigateToEditProfile = () => {
    navigate("/marketplace/edit-profile")
    handleClose()
  }

  const handleSignOut = async () => {

    try {
      const response = await signoutService(token);
      successToast("Đăng xuất thành công");
      handleClose();
      dispatch(setUserDefault());
      dispatch(resetListOderProduct());
      localStorage.removeItem("accessToken");
      navigate("/marketplace");
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    navigate(`/marketplace/search/${searchTerm}`);
  };

  const handleNavigateToCart = () => {
    navigate("/marketplace/cart");
  };

  return (
    <div className="container-nav">
      <div className="content-nav">
        <Link
          className="logo"
          to="/marketplace"
          style={{ cursor: "pointer", marginRight: "50px" }}
        >
          <img
            src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715279765/chonoicairang.net__ikgznu.png"
            alt="logo"
          />
        </Link>
        <div className="search-bar">
          <div className="flex items-center h-[35px]">
            <input
              type="text"
              placeholder="Tìm mọi thứ"
              value={searchTerm}
              onChange={handleChange}
              className="py-1 px-[0.75rem] border border-[#FFC048] rounded-l-md w-full h-full outline-none transition duration-300 ease-in-out"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <div
              className="search-icon bg-[#FFC048] flex items-center justify-center h-full min-w-[35px] cursor-pointer hover:bg-[#D26E43]"
              onClick={() => handleSearch()}
            >
              <SearchIcon style={{ color: "#fff" }} />
            </div>
          </div>
          <div className="phone-number">
            <FaPhoneAlt size={15} />
            <span className="tracking-tight text-red-500"> 0939.39.39.39</span>
          </div>
        </div>
        <div className="login-item">
          {isSignedIn ? (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: "#7DB249 !important" }}
              >
                {username}&nbsp;
                <Stack direction="row" spacing={2}>
                  <Avatar
                    // sizes="30"
                    alt={username} src={avatar}
                  />
                </Stack>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleNavigateToEditProfile}>Trang cá nhân</MenuItem>
                {localStorage.getItem("role") === "0" && <MenuItem onClick={() => navigate("/admin")}>Trang quản trị</MenuItem>}
                {localStorage.getItem("role") === "1" && <MenuItem onClick={() => navigate("/merchant")}>Dashboard</MenuItem>}
                <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="login" onClick={() => handleLogin()}>
              <span className="tracking-tight font-medium text-black">
                Đăng nhập
              </span>
            </div>
          )}
          <div className="item-cart" onClick={() => handleNavigateToCart()}>
            <span className=" font-medium relative mr-2">
              <span className="text-base">{
                localStorage.getItem("totalPriceProduct") ? localStorage.getItem("totalPriceProduct") : 0
              }</span>
              <span className="text-xs relative top-[-0.2em] font-medium underline">
                đ
              </span>
            </span>
            <span>
              <BsCart4 />
            </span>
          </div>
        </div>
      </div>
      <div className="menu-header">
        <div className="ResponsiveAppBar">
          <ResponsiveAppBar />
        </div>
      </div>
    </div>
  );
};

export default MarketNavbar;

import "./style.scss";
import * as React from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuImg from "./MenuImg";
import { Link, useNavigate } from "react-router-dom";

const MenuProduct = () => {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const navigate = useNavigate()

  const reditectToTourPage = () => {
    navigate("/tour")
  }

  const [NSS, setNSS] = React.useState([
    {
      name: "Sầu Riêng",
      slug: "sau-rieng",
    },
    {
      name: "Cam",
      slug: "cam",
    },
    {
      name: "Dưa lưới",
      slug: "dua-luoi",
    },
    {
      name: "Măng cụt",
      slug: "mang-cut",
    },
    {
      name: "Xoài",
      slug: "xoai",
    },
    {
      name: "Bưởi",
      slug: "buoi",
    },
    {
      name: "Dừa",
      slug: "dua",
    },
    {
      name: "Gạo",
      slug: "gao",
    },
  ]);

  const [NSCB, setNSCB] = React.useState([
    {
      name: "Socola",
      slug: "socola",
    },
    {
      name: "Đường Thốt Nốt",
      slug: "duong-thot-not",
    },
    {
      name: "Mật Hoa Dừa",
      slug: "mat-hoa-dua",
    },
    {
      name: "Tinh Dầu",
      slug: "tinh-dau",
    },
    {
      name: "Trái Cây Sấy",
      slug: "trai-cay-say",
    },
    {
      name: "Bánh Pía",
      slug: "banh-pia",
    },
  ]);

  const [TCMN, setTCMN] = React.useState([
    {
      name: "Giỏ Xách",
      slug: "gio-xach",
    },
    {
      name: "Đồ Handmade",
      slug: "do-handmade",
    },
    {
      name: "Thảm Trang Trí",
      slug: "tham-trang-tri",
    },
    {
      name: "Sợi",
      slug: "soi",
    },
    {
      name: "Lụa Lãnh Mỹ A",
      slug: "lua-lanh-my-a",
    },
  ]);

  const [MHKhac, setMHKhac] = React.useState([
    {
      name: "Lá Chuối Tươi",
      slug: "la-chuoi-tuoi",
    },
    {
      name: "Phân Hữu Cơ",
      slug: "phan-huu-co",
    },
    {
      name: "Ống Hút Hữu Cơ",
      slug: "ong-hut-huu-co",
    },
    {
      name: "Thủy Sản",
      slug: "thuy-san",
    },
  ]);

  const handleClick = (tmp) => {
    switch (tmp) {
      case "open1":
        setOpen1(!open1);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        break;
      case "open2":
        setOpen2(!open2);
        setOpen1(false);
        setOpen3(false);
        setOpen4(false);
        break;
      case "open3":
        setOpen3(!open3);
        setOpen1(false);
        setOpen2(false);
        setOpen4(false);
        break;
      case "open4":
        setOpen4(!open4);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="menu-product-container">
      <div className="menu-product">
        <div className="menu-list">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={() => handleClick("open1")}>
              <ListItemText
                primary={<span className="font-medium">NÔNG SẢN SẠCH</span>}
                className="title-product"
              />
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {NSS.map((item, index) => {
                  return (
                    <Link
                      to={`/marketplace/search/category/${item.slug}`}
                      className="text-decoration-none text-black"
                    >
                      <ListItemButton sx={{ pl: 4 }} key={index}>
                        <ListItemText
                          primary={item.name}
                          className="name-product"
                        />
                      </ListItemButton>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("open2")}>
              <ListItemText
                primary={<span className="font-medium">NÔNG SẢN CHẾ BIẾN</span>}
                className="title-product"
              />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {NSCB.map((item, index) => {
                  return (
                    <Link
                      to={`/marketplace/search/category/${item.slug}`}
                      className="text-decoration-none text-black"
                    >
                      <ListItemButton sx={{ pl: 4 }} key={index}>
                        <ListItemText
                          primary={item.name}
                          className="name-product"
                        />
                      </ListItemButton>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("open3")}>
              <ListItemText
                primary={<span className="font-medium">THỦ CÔNG MỸ NGHỆ</span>}
                className="title-product"
              />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {TCMN.map((item, index) => {
                  return (
                    <Link
                      to={`/marketplace/search/category/${item.slug}`}
                      className="text-decoration-none text-black"
                    >
                      <ListItemButton sx={{ pl: 4 }} key={index}>
                        <ListItemText
                          primary={item.name}
                          className="name-product"
                        />
                      </ListItemButton>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("open4")}>
              <ListItemText
                primary={<span className="font-medium">MẶT HÀNG KHÁC</span>}
                className="title-product"
              />
              {open4 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open4} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {MHKhac.map((item, index) => {
                  return (
                    <Link
                      to={`/marketplace/search/category/${item.slug}`}
                      className="text-decoration-none text-black"
                    >
                      <ListItemButton sx={{ pl: 4 }} key={index}>
                        <ListItemText
                          primary={item.name}
                          className="name-product"
                        />
                      </ListItemButton>
                    </Link>
                  );
                })}
              </List>
            </Collapse>
            <ListItemButton>
              <ListItemText
                primary={
                  <span className="font-medium"
                    onClick={reditectToTourPage}
                  >TOUR DU LỊCH CHỢ NỔI</span>
                }
                className="title-product"
              />
            </ListItemButton>
          </List>
        </div>
        <div className="menu-img">
          <MenuImg />
        </div>
      </div>
    </div>
  );
};

export default MenuProduct;

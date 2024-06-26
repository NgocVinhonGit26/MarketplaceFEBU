import "./style.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TourNavbar = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate("/tour/cart")
  }

  const handleNavigateToMarket = () => {
    navigate("/marketplace")
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/tour">
            <img
              width="60"
              height="70"
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715279799/Logo-Nu-Cuoi-Me-Kong-2023-2x_ycczvs.png"
              alt="logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/tour/search" className="text-decoration-none nav-link">
              {/* <NavDropdown
                title="Tất cả Tour"
                id="collapsible-nav-dropdown"
                className="text-black"
              >
                <NavDropdown.Item href="#action/3.1">
                  Tour Biển Đảo
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Tour Sài Gòn
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Tour Hành Hương
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Tour Khách Đoàn
                </NavDropdown.Item>
              </NavDropdown> */}
              Tất cả Tour
            </Link>
            <Link to="/marketplace" className="text-decoration-none nav-link">
              Đặc sản vùng miền
            </Link>
            <NavDropdown title="Tour Miền Tây" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Tour miền Tây từ Sài Gòn
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Tour miền Tây từ Cần Thơ
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Tour miền Tây từ Cà Màu
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="#pricing">Tour Miền Trung</Nav.Link>
            <Nav.Link href="#pricing">Tour Miền Bắc</Nav.Link>
            <Nav.Link href="#pricing">Tour Nước Ngoài</Nav.Link>
            <NavDropdown title="Dịch vụ" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Combo du lịch
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Homestay</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Khách sạn</NavDropdown.Item>
              <NavDropdown.Item
                onClick={handleNavigateToMarket}
              >
                Marketing Online
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleNavigateToCart}>
              <WorkOutlineIcon />
            </Nav.Link>
            <Nav.Link eventKey={2} >
              <AccountCircleOutlinedIcon />
            </Nav.Link>
            <div className="nav-link relative">
              <SearchOutlinedIcon
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
              />
              {open && (
                <div className="absolute top-[55px] right-0  rounded-md bg-white flex items-center z-10 p-[10px]">
                  <div className="flex items-center h-[40px]">
                    <input
                      type="text"
                      placeholder="tìm kiếm"
                      className="search-input h-full outline-none p-2 font-normal opacity-70"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                      to={search ? `/tour/search/${search}` : "/tour/search"}
                      className="text-decoration-none bg-[#67a448] h-full w-[40px] flex justify-center items-center"
                    >
                      <SearchOutlinedIcon style={{ color: "white" }} />
                    </Link>
                    {/* <div className="bg-[#67a448] h-full w-[40px] flex justify-center items-center"></div> */}
                  </div>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TourNavbar;

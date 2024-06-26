import "./style.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import GitHub from "@mui/icons-material/GitHub";
import Instagram from "@mui/icons-material/Instagram";

const TourFooter = () => {
  return (
    <div className="footer">
      <div className="container my-5">
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#45526e" }}
        >
          <div className="container p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-md-5 col-lg-5 col-xl-5 mx-auto mt-5">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    CÔNG TY CỔ PHẦN THƯƠNG MẠI DU LỊCH NỤ CƯỜI CÁ CHÉP
                  </h6>
                  <p>MST: 1801511350. Ngày cấp giấy phép: 24/01/2017</p>
                  <p>VP 2 Đại lộ Hoà Bình, Tân An, Ninh Kiều, Cần Thơ</p>
                  <p>Email: cachep@gmail.com</p>
                  <p>SĐT: 0987654321</p>
                </div>

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Liên kết hữu ích
                  </h6>
                  <p>
                    <KeyboardArrowRightIcon />
                    <a className="text-white">Giới thiệu</a>
                  </p>
                  <p>
                    <KeyboardArrowRightIcon />
                    <a className="text-white">Liên hệ</a>
                  </p>
                  <p>
                    <KeyboardArrowRightIcon />
                    <a className="text-white">Thư ngỏ</a>
                  </p>
                  <p>
                    <KeyboardArrowRightIcon />
                    <a className="text-white">Điều khoản và Điều kiện</a>
                  </p>
                  <p>
                    <KeyboardArrowRightIcon />
                    <a className="text-white">Chính sách bảo mật</a>
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Giải thưởng và Chứng nhận
                  </h6>
                  <p>
                    <i className="fas fa-home mr-3"></i> Asia's Leading City
                    Break Destination 2023
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3"></i> Asia's Leading City
                    Tourist Board
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3"></i> Asia’s Leading City
                    Destination 2023
                  </p>
                  {/* <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p> */}
                </div>
              </div>
            </section>

            <hr className="my-3" />

            <section className="p-3 pt-0">
              <div className="row d-flex align-items-center">
                <div className="col-md-7 col-lg-8 text-center text-md-start">
                  <div className="p-3">
                    © 2020 Copyright:
                    <a className="text-white" href="https://facebook.com/">
                      ABCD1234
                    </a>
                  </div>
                </div>

                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                  <a
                    className="btn btn-outline-light btn-floating m-1"
                    // className="text-white"
                    role="button"
                  >
                    <Facebook />
                  </a>

                  <a
                    className="btn btn-outline-light btn-floating m-1"
                    // className="text-white"
                    role="button"
                  >
                    <Twitter />
                  </a>

                  <a
                    className="btn btn-outline-light btn-floating m-1"
                    // className="text-white"
                    role="button"
                  >
                    <GitHub />
                  </a>

                  <a
                    className="btn btn-outline-light btn-floating m-1"
                    // className="text-white"
                    role="button"
                  >
                    <Instagram />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TourFooter;

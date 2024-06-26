import "./style.scss";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PhoneIcon from "@mui/icons-material/Phone";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const HeaderTour = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="header-tour">
      <div className="header-tour__swiper">
        <header>
          <div className="p-5 text-center bg-image dmm">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              <SwiperSlide
                className="dmm1"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dkcetq9et/image/upload/v1715279904/coverweb1_urjzqr.png')",
                }}
              ></SwiperSlide>
              <SwiperSlide
                className="dmm1"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dkcetq9et/image/upload/v1715279934/coverweb3_jmbs1p.png')",
                }}
              ></SwiperSlide>
              <SwiperSlide
                className="dmm1"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dkcetq9et/image/upload/v1715279960/coverweb2_pbqnrx.png')",
                }}
              ></SwiperSlide>

              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
            {/* <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6);" }}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-white">
                                <h1 className="mb-3">heheheheheh</h1>
                                <h4 className="mb-3">Subheading</h4>
                                <a className="btn btn-outline-light btn-lg" href="#!" role="button"
                                >Call to action</a
                                >
                            </div>
                        </div>
                    </div> */}
          </div>
        </header>
      </div>
      <div className="header-tour__content">
        <div className="title__content">
          <div className="title__content__line1">
            <h3>VỀ</h3>
          </div>
          <div className="title__content__line23">
            <h1>NỤ CƯỜI</h1>
          </div>
          <div className="title__content__line23">
            <h1>CÁ CHÉP</h1>
          </div>
        </div>
        <div className="content__content">
          <div className="container-content__desciption">
            <div className="content__description">
              <div className="content__description__text">
                <span>
                  <a>
                    <strong>Công ty Du lịch Nụ Cười Mê Kông</strong>
                  </a>
                  &nbsp;là công ty du lịch, dịch vụ chuyên nghiệp, uy tín, đáng
                  tin cậy ở Cần Thơ. Chúng tôi chuyên về các&nbsp;
                  <a>
                    <strong>
                      tour du lịch Cần Thơ, tour chợ nổi Cái Răng, tour Cồn Sơn,
                      tour miền Tây, tour miền Bắc, tour miền Trung, tour nước
                      ngoài
                    </strong>
                  </a>
                  &nbsp;với sự cam kết chất lượng dịch vụ tốt nhất dành cho
                  khách hàng. Nụ cười của quý khách chính là niềm hạnh phúc,
                  động lực lớn cho công ty để đem đến trải nghiệm tốt nhất cho
                  khách hàng.
                </span>
              </div>
              <div className="content__description__btn">
                <Stack direction="row" spacing={3}>
                  <Button variant="contained" style={{ background: "#67A448" }}>
                    <a
                      href="/tour"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Về chúng tôi <KeyboardArrowRightIcon />
                    </a>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ border: "2px solid #67A448" }}
                  >
                    <a
                      href="/tour"
                      style={{ textDecoration: "none", color: "#67A448" }}
                    >
                      Liên hệ ngay <PhoneIcon />
                    </a>
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
          <div className="content__img"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTour;

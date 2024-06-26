import "./style.scss";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const MenuImg = () => {
  return (
    <div className="menu-img-container">
      <div className="menu-top">
        <div className="slide">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278859/cncrtest_0.5x_fdegdp.png"
                alt="slide-1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278941/srr6_0.5x_t47hxx.png"
                alt="slide-2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278970/cam-xoan_j7p9di.png"
                alt="slide-3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="imgs-top-right">
          <div className="img-top-right">
            <img
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278995/nong-san-sach_0.5x_znhssl.png"
              alt="img-1"
            />
          </div>
          <div className="img-top-right">
            <img
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715279018/nong-san-che-bien_kjapiw.png"
              alt="img-2"
            />
          </div>
        </div>
      </div>
      <div className="menu-bottom">
        <div className="img-bottom">
          <img
            src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715279058/cho-noi-online_pfsoga.png"
            alt="img-1"
          />
        </div>
        <div className="img-bottom">
          <img
            src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715279082/mat-hang-khac-1_i2rkgy.png"
            alt="img-2"
          />
        </div>
        <div className="img-bottom">
          <img
            src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715279106/thu-cong-my-nghe_0.5x_zspxgb.png"
            alt="img-3"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuImg;

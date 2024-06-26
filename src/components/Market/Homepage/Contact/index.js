import "./style.scss";

const Contact = () => {
  return (
    <div className="container-contact">
      <div className="service-quality">
        <div className="service">
          <div className="service-logo">
            <img
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278586/Screenshot_2024-05-10_011606_qaeofq.png"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>CAM KẾT CHẤT LƯỢNG</span>
          </div>
        </div>
        <div className="service">
          <div className="service-logo">
            <img
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278703/Screenshot_2024-05-10_011712_tzdwxm.png"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>ĐỔI TRẢ DỄ DÀNG</span>
          </div>
        </div>
        <div className="service">
          <div className="service-logo">
            <img
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278704/Screenshot_2024-05-10_011743_wz1doh.png"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>HỖ TRỢ 24/7</span>
          </div>
        </div>
        <div className="service">
          <div className="service-logo">
            <img
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278704/Screenshot_2024-05-10_011807_kqtvgk.png"
              alt="service-logo"
            />
          </div>
          <div className="service-content">
            <span>GIAO HÀNG THẦN TỐC</span>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="contact-img">
          <img
            src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278803/banner-si-ngang_hb59rq.jpg"
            alt="contact-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;

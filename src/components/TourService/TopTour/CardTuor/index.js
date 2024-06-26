import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./style.scss";

const CardTour = () => {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          // image="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/cho-noi-cai-rang-2-600x338.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="title-card"
          >
            Tour Du Lịch Mỹ Khánh Cần Thơ – Một ngày Tây Đô Giá Rẻ
          </Typography>
          <Typography variant="body2" color="text.secondary" className="price">
            <del
              style={{
                color: "#FFA7A4",
                fontSize: "1.2em",
                marginRight: "1.3em",
              }}
            >
              1.050.000₫
            </del>
            <ins
              style={{
                color: "#FF5E57",
                fontSize: "1.2em",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              850.000₫
            </ins>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  <img
                    src="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/thoi-gian.png"
                    alt=""
                  />
                </div>
                <div className="text-infor">Thời gian khởi hành:</div>
              </div>
              <div className="value-infor">7:10</div>
            </div>
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  {/* <img
                    src="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/dia-diem.png"
                    alt=""
                  /> */}
                </div>
                <div className="text-infor">Địa điểm khởi hành:</div>
              </div>
              <div className="value-infor">Cà Mau</div>
            </div>
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  {/* <img
                    src="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/thoi-gian-tour.png"
                    alt=""
                  /> */}
                </div>
                <div className="text-infor">Thời gian tour:</div>
              </div>
              <div className="value-infor">1 ngày</div>
            </div>
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  {/* <img
                    src="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/phuong-tien.png"
                    alt=""
                  /> */}
                </div>
                <div className="text-infor">Phương tiện di chuyển:</div>
              </div>
              <div className="value-infor">Xe du lịch, tàu ca nô</div>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardTour;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./style.scss";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { useNavigate } from "react-router-dom";

const CardTour = ({ tour }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // console.log("navigate");
    navigate(`/tour/detail/${tour?.slug}`);
  }

  // console.log("tour >>>>>>>", tour);

  return (
    <Card
      sx={{ maxWidth: "100%" }}
      component={Link}
      // onClick={handleNavigate()}
      to={`/tour/detail/${tour?.slug}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            tour?.avatar ||
            "https://res.cloudinary.com/dkcetq9et/image/upload/v1715279235/tour-mien-tay-2-ngay-1-dem-gia-re_jwfrtx.jpg"
          }
          alt="green iguana"
        />
        <CardContent>
          {/* <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="title-card"
          >
            
          </Typography> */}
          <div className="title-card float-left mb-3">{tour?.name}</div>
          <Typography variant="body2" color="text.secondary" className="price">
            {/* <del
              style={{
                color: "#FFA7A4",
                fontSize: "1.2em",
                marginRight: "1.3em",
              }}
            >
              1.050.000₫
            </del> */}
            <ins
              style={{
                color: "#FF5E57",
                fontSize: "1.2em",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              {tour?.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
              ₫
            </ins>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  <AccessTimeIcon color="success" />
                </div>
                <div className="text-infor">Thời gian khởi hành:</div>
              </div>
              <div className="value-infor">7:10</div>
            </div>
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  <PlaceIcon color="success" />
                </div>
                <div className="text-infor">Địa điểm khởi hành:</div>
              </div>
              <div className="value-infor">{tour?.startLocation}</div>
            </div>
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  <TimelapseIcon color="success" />
                </div>
                <div className="text-infor">Thời gian tour:</div>
              </div>
              <div className="value-infor">{tour?.tourDuration}</div>
            </div>
            <div className="detail-infor">
              <div className="title-infor">
                <div className="icon-infor">
                  <ConnectingAirportsIcon color="success" />
                </div>
                <div className="text-infor">Phương tiện di chuyển:</div>
              </div>
              <div className="value-infor">{tour?.transportation}</div>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardTour;

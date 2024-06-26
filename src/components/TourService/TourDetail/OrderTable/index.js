import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "redux/slices/listOrderTourSlice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OrderTable(props) {
  const { quantityOder, setQuantityOrder, tour } = props;
  const navigate = useNavigate();
  // const userId = useSelector((state) => state.user.id);
  const userId = localStorage.getItem("id");
  const dispatch = useDispatch();

  // console.log("tour", tour)

  const [order, setOrder] = React.useState({
    idOrderTour: 0,
    status: 0,
    paymentMethod: "cash",
    startTime: "",
    quantity: quantityOder,
    tourId: 0,
    tourName: "",
    price: 0,
    userId: userId,
    createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  React.useEffect(() => {
    const idOrderTourFromLocalStorage = localStorage.getItem('idOrderTour');
    if (idOrderTourFromLocalStorage) {
      // Nếu có giá trị trong localStorage, cập nhật state
      setOrder(prevOrder => ({
        ...prevOrder,
        idOrderTour: parseInt(idOrderTourFromLocalStorage),
      }));
    }
  }, []);



  const handleAdd = () => {
    setQuantityOrder(quantityOder + 1);
    //update order
    setOrder({
      ...order,
      quantity: quantityOder + 1,
      tourId: tour.id,
      tourName: tour.name,
      price: tour.price,
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    });
  };
  const handleReduce = () => {
    if (quantityOder > 0) {
      setQuantityOrder(quantityOder - 1);
      //update order
      setOrder({
        ...order,
        quantity: quantityOder - 1,
        tourId: tour.id,
        tourName: tour.name,
        price: tour.price,
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
    }
  };

  const handleDatePickerChange = (newDate) => {
    const formattedDate = new Date(newDate).toISOString().slice(0, 19).replace("T", " ");
    setOrder(prevOrder => ({
      ...prevOrder,
      startTime: formattedDate,
    }));
  };

  const handleAddOrder = async () => {
    try {

      // console.log("accessTOken >>>>>>>>>", accessToken)
      if (quantityOder === 0) {
        alert("Vui lòng chọn số lượng tour muốn đặt");
        return;
      }
      console.log("order>>1", order);
      // dispatch(setOrderTourRD(order));
      setOrder(prevOrder => ({
        ...prevOrder,
        idOrderTour: prevOrder.idOrderTour + 1,
      }));
      localStorage.setItem('idOrderTour', order.idOrderTour + 1);
      // console.log("order>>2", order);
      dispatch(addOrder(order));
      // dispatch(resetState())
      // const res = await orderTour(order, accessToken);
      // console.log("order tour", res);
      // if (res.status === 201) {
      navigate("/tour/cart")
      // }
    }
    catch (error) {
      console.log(error);
    }
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 530, backgroundColor: "#F7F7F7 !important" }}>
      <Card sx={{ maxWidth: "100%", boxShadow: "initial !important" }}>
        <CardActionArea sx={{ backgroundColor: "#F7F7F7 !important" }}>
          <CardContent>
            {/* <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="title-card"
            >
              {tour?.name}
            </Typography> */}
            {/* <div className="title-card float-left mb-3">{tour?.name}</div> */}
            <Typography variant="body2" color="text.black">
              <div className="detail-infor">
                <div className="title-infor">
                  <div className="icon-infor">
                    {/* <img
                      src="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/thoi-gian.png"
                      alt=""
                    /> */}
                  </div>
                  <div className="text-infor">Dự kiến khởi hành:</div>
                </div>
                <div className="value-infor">{tour?.startTime}</div>
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
                <div className="value-infor">{tour?.startLocation}</div>
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
                <div className="value-infor">{tour?.tourDuration} </div>
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
                <div className="value-infor">{tour?.transport}</div>
              </div>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="price"
            >
              <ins
                style={{
                  color: "#FF5E57",
                  fontSize: "1.6em",
                  textDecoration: "none",
                  fontWeight: "700",
                  marginLeft: "10px",
                  marginTop: "20px",
                  letterSpacing: "0.5px",
                }}
              >
                {tour?.price
                  ?.toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                ₫
              </ins>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <CardActions disableSpacing>
        <span
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: "#7DB249",
          }}
        >
          Đặt tour tại đây
        </span>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#7DB249" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DemoItem label="Ngày khởi hành">
                  <DesktopDatePicker
                    defaultValue={dayjs(tour?.startTime)}
                    renderInput={(params) => <TextField {...params}
                      value={dayjs().format("DD/MM/YYYY")}
                    />}
                    onChange={handleDatePickerChange}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Typography>
          <Typography paragraph>
            <div
              className="btn-group"
              role="group"
              style={{ marginRight: "50px" }}
            >
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => handleAdd()}
              >
                +
              </button>
              <button type="button" className="btn btn-outline-success">
                {quantityOder}
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => handleReduce()}
              >
                -
              </button>
            </div>
            <button type="button" className="btn btn-success"
              onClick={() => handleAddOrder()}
            >
              Thêm vào giỏ hàng
            </button>
          </Typography>
          <Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Họ và tên"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
              />
              <button type="button" className="btn btn-success">
                Gọi lại cho tôi
              </button>
            </Box>
          </Typography>
          <IconButton aria-label="add to favorites">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="share">
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <EmailIcon />
          </IconButton>
          <IconButton>
            <PinterestIcon />
          </IconButton>
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </CardContent>
      </Collapse>
    </Card>
  );
}

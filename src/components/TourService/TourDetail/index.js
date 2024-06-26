import "./style.scss";
import TourLayout from "layouts/CustomerLayout/TourLayout";
import CustomSeparator from "./CustomSeparator";
import OrderTable from "./OrderTable";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import InforContact from "./InforContact";
import WhyTable from "./WhyTable";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import RecommendTour from "./RecommenrTour";
import { getTourBySlug } from "api/tour";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import parse from "html-react-parser";


const TourDetail = () => {
  const [quantityOder, setQuantityOrder] = useState(0);
  const [tour, setTour] = useState({});

  const { slug } = useParams();
  console.log("get tour by slug", slug);
  useLayoutEffect(() => {
    const fetchTour = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await getTourBySlug(slug, accessToken);

        setTour(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTour();
  }, [slug]);

  useEffect(() => {
    // Đặt trạng thái cuộn trang về đầu trang khi trang được tải lại hoặc khi chuyển trang
    window.scrollTo(0, 0);
  }, [slug]);
  let mybutton;

  window.onscroll = function () {
    mybutton = document.getElementById("btn-back-to-top");
    if (mybutton) {
      // Kiểm tra xem phần tử có tồn tại không
      scrollFunction(mybutton);
    }
  };

  function scrollFunction(mybutton) {
    if (mybutton) {
      // Kiểm tra xem phần tử có tồn tại không
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  return (
    <div>
      <TourLayout>
        <div className="Container-DetailTour">
          <MDBBtn
            onClick={backToTop}
            id="btn-back-to-top"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              display: "none",
              backgroundColor: "transparent",
              border: "none",
            }}
            // className='btn-floating'
            size="lg"
          >
            <ArrowCircleUpIcon sx={{ color: "#67A448" }} fontSize="large" />
          </MDBBtn>
          <div className="DetailTour">
            <div className="Breadcrumb-Title p-0 my-10">
              <div className="Breadcrumb-Container">
                <CustomSeparator />
              </div>
              <div className="Title-Container">
                <h3 className="Title-Tour">{tour?.name}</h3>
              </div>
            </div>
            <div className="Content-DetailTour">
              <div className="Detail-Description-Container">
                <div className="Detail-Description">
                  <div className="Avt-tour">
                    <img src={tour?.avatar} alt="" />
                  </div>
                  <div className="Description-tour">
                    {tour.tourInformation ? parse(tour.tourInformation) : ""}
                  </div>
                </div>
              </div>
              <div className="Consultation-table">
                <OrderTable
                  quantityOder={quantityOder}
                  setQuantityOrder={setQuantityOrder}
                  tour={tour}
                />
                <InforContact />
                <WhyTable />
              </div>
            </div>
            <div className="recommend-tour">
              <div className="title-recommend">
                <h3>Có thể bạn quan tâm</h3>
                <div className="Divider "></div>
              </div>
              <div className="grid-tour">
                <RecommendTour />
              </div>
            </div>
          </div>
        </div>
      </TourLayout>
    </div>
  );
};

export default TourDetail;

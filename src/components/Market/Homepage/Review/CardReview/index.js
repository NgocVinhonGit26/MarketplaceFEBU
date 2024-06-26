import "./style.scss";
import GradeIcon from "@mui/icons-material/Grade";
import { v4 as uuidv4 } from "uuid";

const CardReview = ({ item }) => {
  const StarRating = 5;
  return (
    <div className="container-cardreview cursor-pointer">
      <div className="card-review">
        <div className="card-review__img">
          <img src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715279164/businessman-character-avatar-isolated_24877-60111_qj8ddn.jpg" />
        </div>
        <div className="card-review__content">
          <div className="card-review__star-rating">
            {/* for */}
            {Array(StarRating)
              .fill()
              .map((_, i) => (
                <GradeIcon sx={{ color: "#FFC048" }} key={uuidv4()} />
              ))}
          </div>
          <div className="card-review__content--text">
            <p>
              Mình bị ghiền sầu riêng luôn kể từ lúc mua 2 quả ở Chợ nổi Cái
              Răng Online. Sầu riêng ngon, ngọt, hột lép tuyệt cú mèo luôn.
            </p>
          </div>
          <div className="card-review__content--name">
            <h3>Chị Thanh Lam</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReview;

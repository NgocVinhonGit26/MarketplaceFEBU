import CardReview from "./CardReview";
import "./style.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Review = () => {
  return (
    <div className="container-review">
      <div className="review">
        <div className="review__blank"></div>
        <div className="review__title">
          <b></b>
          <div className="review__title--text">
            <h2>KHÁCH HÀNG NÓI GÌ VỀ CHỢ NỔI CÁI RĂNG ONLINE</h2>
          </div>
          <b></b>
        </div>
        <div className="review__content">
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
        </div>
        <div className="review__btn">
          <button>
            VIẾT NHẬN XÉT <FavoriteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;

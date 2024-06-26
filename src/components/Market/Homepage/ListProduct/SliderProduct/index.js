import "./style.scss";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import CardProduct from "./CardProduct";
import { v4 as uuidv4 } from "uuid";

const SliderProduct = (props) => {
  const { items } = props;
  const lengthItem = items.length;

  return (
    <div className="container-sliderproduct">
      {items && items.length > 0 && (
        <Slide
          slidesToScroll={4}
          slidesToShow={4}
          indicators={true}
          autoplay={lengthItem <= 4 ? false : true}
        >
          {items.map((item, index) => (
            <div className="each-slide" key={uuidv4()}>
              <CardProduct item={item} />
            </div>
          ))}
        </Slide>
      )}
    </div>
  );
};

export default SliderProduct;

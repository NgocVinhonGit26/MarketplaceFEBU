import "./style.scss";
import { Link } from "react-router-dom";

const SmallProduct = (props) => {
  const { item } = props;

  return (
    <Link
      className="container-smallproduct cursor-pointer no-underline text-black"
      to={`/marketplace/product/${item.slug}`}
    >
      <div className="smallproduct">
        {item.sale > 0 && (
          <div className="decrease">
            <span>-</span>
            <span>{item.sale}%</span>
          </div>
        )}
        <div className="smallproduct-infor">
          <div className="smallproduct__img">
            <img src={item.img} alt="" />
          </div>
          <div className="smallproduct__content">
            <div className="smallproduct__content--name">
              <p>{item.name}</p>
            </div>
            <div className="smallproduct__content--price">
              <p className="price">{item.price}đ</p>
              <p className="price-sale">
                {(item.price * (100 - item.sale)) / 100}đ
              </p>
            </div>
            <div className="add-to-cart py-1">
              <button>THÊM VÀO GIỎ HÀNG</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SmallProduct;

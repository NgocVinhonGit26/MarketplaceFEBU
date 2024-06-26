import "./style.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CardProduct = ({ item }) => {
  const { sale, image, name, price, slug } = item;
  const navigate = useNavigate();

  const handleAddToCart = (slug) => {
    console.log("Add to cart");
    navigate(`/marketplace/product/${slug}`);
  }

  return (
    <div className="container-smallproductss cursor-pointer">
      <div className="smallproduct">
        {sale > 0 && (
          <div className="decrease">
            <span>-</span>
            <span>{sale}%</span>
          </div>
        )}
        <div className="smallproduct-infor">
          <Link
            className="smallproduct__img"
            to={`/marketplace/product/${slug}`}
          >
            <img src={image} alt="" className="" />
          </Link>
          <div className="smallproduct__content">
            <div className="smallproduct__content--name">
              <p>{name}</p>
            </div>
            <div className="smallproduct__content--price">
              {sale > 0 ? (
                <>
                  <p className="price">{price}đ</p>
                  <p className="price-sale">{price - (price * sale) / 100}đ</p>
                </>
              ) : (
                <p className="font-bold text-black">{price}đ</p>
              )}
            </div>
            <div className="add-to-cart py-1" onClick={() => handleAddToCart(slug)}>
              <button>THÊM VÀO GIỎ HÀNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;

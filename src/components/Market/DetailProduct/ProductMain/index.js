import "./style.scss";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { getCategoryById } from "api/category";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { infoToast } from "utilities/toast";
import { warningToast } from "utilities/toast";
import { createOrderProduct } from "api/productOrder";
import { getLastOrderProduct } from "api/productOrder";
import { insertOrderItem } from "api/productOrder";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from "redux/slices/listOrderProductSlice";
import { resetListOderProduct } from "redux/slices/listOrderProductSlice";



const ProductMain = (props) => {
  const { product, orderProduct, setOrderProduct } = props;
  const [quantity, setQuantity] = React.useState(0);
  const [lastOrderProductId, setLastOrderProductId] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemId, setItemId] = React.useState(0);


  const [item, setItem] = React.useState({
    id: 0,
    status: "pending",
    productId: 0,
    productName: "",
    productPrice: 0,
    orderProductId: 0,
    shopBoatId: 0,
    quantity: 0,
    price: 0,
    sale: 0,
  });

  useEffect(() => {
    const idOrderItemFromLocalStorage = localStorage.getItem("idOrderItem")
    if (idOrderItemFromLocalStorage) {
      setItem(prevState => ({
        ...prevState,
        id: parseInt(idOrderItemFromLocalStorage)
      }))
    }
  }, [])

  const creatNewCart = async () => {
    if (localStorage.getItem("hadCart") === "false") {
      const hadCart = await createOrderProduct(orderProduct)
      // console.log("response: createOrderProduct", hadCart)
      localStorage.setItem("hadCart", true)
    }
    await fetchLastOrderProduct()
  }
  const fetchLastOrderProduct = async () => {
    const response = await getLastOrderProduct(localStorage.getItem("id"))
    // console.log("response: getLastOrderProduct", response.data)
    localStorage.setItem("orderProductId", response.data)
    setLastOrderProductId(response.data)
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setItem(prevState => ({
      ...prevState,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      orderProductId: lastOrderProductId,
      shopBoatId: product.shopBoatId,
      quantity: quantity + 1,
      price: product.price * (quantity + 1),
    }))

  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setItem(prevState => ({
        ...prevState,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        orderProductId: lastOrderProductId,
        shopBoatId: product.shopBoatId,
        quantity: quantity - 1,
        price: product.price * (quantity - 1),
      }))
    } else {
      warningToast("Số lượng không thể nhỏ hơn 0", 3000);
      return
    }
  };

  const handleAddProductToCart = async () => {
    // setQuantity(121)
    if (quantity > product.countInStock) {
      warningToast(`Xin lỗi quý khách ! Chúng tôi chỉ còn ${product.countInStock} sản phẩm trong kho.`, 3000);
      return
    }
    if (quantity === 0) {
      warningToast("Số lượng không thể nhỏ hơn 1", 3000);
      return;
    }
    try {
      setItem(prevState => {
        return {
          ...prevState,
          id: prevState.id + 1,
          productId: product.id,
          orderProductId: lastOrderProductId, // cart ID
        };
      });
      localStorage.setItem("idOrderItem", item.id + 1)
      console.log("dcm item ahehe", item);
      dispatch(addOrderProduct(item))
      // dispatch(resetListOderProduct())
      // localStorage.setItem("hadCart", false)
      navigate("/marketplace/cart")
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await creatNewCart();
    };

    fetchData();
  }, []);

  useEffect(() => {
    setItem(prevState => {
      return {
        ...prevState,
        orderProductId: lastOrderProductId, // cart ID
      };
    }
    );
  }, [lastOrderProductId]);

  return (
    <div className="product-main">
      <div className="product-main__content">
        <div className="product-main__content__left">
          <div className="product-main__content__left__image">
            {product.image ? (
              <img src={product.image} alt="" />
            ) : (
              <Skeleton
                variant="rectangular"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
        </div>
        <div className="product-main__content__right">
          <div className="product-main__content__path_product">
            <a href="#">Trang chủ</a>
            <span> / </span>
            <a href="#">{product.category}</a>
            <span> / </span>
            <a href="#">{product.name}</a>
          </div>
          <div className="product-main__content__name_product">
            <h1>{product.name}</h1>
          </div>
          <div className="product-main__content__dash"></div>
          <div className="product-main__content__price_product">
            <del>{product.price + "₫"}</del>
            <ins>
              {Number.parseInt(
                product.price - (product.price * product.sale) / 100
              )}
              {" ₫"}
            </ins>
          </div>
          <div className="product-main__content__order_product">
            <ButtonGroup
              variant="contained"
              aria-label="outlined button group"
              size="small"
            >
              <Button onClick={handleIncrement}>+</Button>
              <Button>{quantity}</Button>
              <Button onClick={handleDecrement}>-</Button>
            </ButtonGroup>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#7DB249 !important",
                borderRadius: "1.35rem !important",
                fontWeight: "bold !important",
              }}
              onClick={() => handleAddProductToCart()}
            >
              Thêm hàng vào giỏ
            </Button>
          </div>
          <div className="product-main__content__description_product">
            Giá cả có thể thay đổi tùy theo vụ mùa
            <br />
            Liên hệ giá tốt nhất:
            <a href="#"> 0909.090.090</a>
            <br />
            Fanpage:
            <a href="#"> Chợ Nổi Cái Răng</a>
          </div>
          <br />
          <div className="product-main__content__right_tel">
            <img
              src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278803/banner-si-ngang_hb59rq.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;

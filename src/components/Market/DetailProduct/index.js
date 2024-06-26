import "./style.scss";
import MarketplaceLayout from "layouts/CustomerLayout/MarketplaceLayout";
import ProductMain from "./ProductMain";
import ProductFooter from "./ProductFooter";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "api/product";
import React, { useEffect } from "react";
import { prepareAutoBatched } from "@reduxjs/toolkit";

const DetailProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = React.useState({});
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("id");
  const [orderProduct, setOrderProduct] = React.useState({
    status: "pending",
    paymentMethod: "cash",
    total: 0,
    customer: userId,
    createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ")
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug, accessToken);
        setProduct(response.data);
        // console.log("product detail: ", response);
        // setOrderProduct(prevState => {
        //   setOrderProduct({
        //     ...prevState,
        //     shopBoatId: response.data.shopBoatId,
        //   })
        // })
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [slug]);

  return (
    <MarketplaceLayout>
      <div className="container-DetailProduct">
        <ProductMain
          product={product}
          orderProduct={orderProduct}
          setOrderProduct={setOrderProduct}
        />
        <ProductFooter product={product} />
      </div>
    </MarketplaceLayout>
  );
};

export default DetailProduct;

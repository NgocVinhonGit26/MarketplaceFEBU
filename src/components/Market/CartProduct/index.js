
import "./style.scss"
import React, { useState } from 'react';
import MarketplaceLayout from "layouts/CustomerLayout/MarketplaceLayout";
import OrderTourTotal from "components/TourService/OrderTour/OrderTourTotal";
import CartProductTable from "./CartProductTable";
import CartProductTotal from "./CartProductTotal";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const CartProduct = () => {
    const listOrderProduct = useSelector((state) => state.listOrderProduct.listProduct);
    // console.log("listOrderProduct>>>>>>>>>>>>>>: ", listOrderProduct)
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <div>
            <MarketplaceLayout>
                <div className="Container-OrderTour">
                    <div className="OrderTour">
                        <div className="Content-OrderTour">
                            <div className="Title-OrderTour">
                                <h1>Giỏ hàng</h1>
                            </div>
                            <div className="Table-OrderTour">
                                <CartProductTable
                                    listOrderProduct={listOrderProduct}
                                    totalPrice={totalPrice}
                                    setTotalPrice={setTotalPrice}
                                />
                                <CartProductTotal
                                    totalPrice={totalPrice}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MarketplaceLayout>
        </div>
    )
}

export default CartProduct;
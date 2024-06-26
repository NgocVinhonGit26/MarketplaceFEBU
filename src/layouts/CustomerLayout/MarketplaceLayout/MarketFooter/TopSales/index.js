import React from "react";
import "./style.scss";
import { useState } from "react";

const TopSales = () => {
  const [topSales, setTopSales] = useState([
    {
      id: 1,
      name: "Bánh Pía Can Xại Đặc sản Sóc Trăng",
      price: 75000,
      sale: 65000,
      img: "https://res.cloudinary.com/dkcetq9et/image/upload/v1715280846/banh-pia-can-xai-soc-trang-2-100x100_pmvzw2.jpg",
    },
    {
      id: 2,
      name: "Sầu riêng Ri 6",
      price: 100000,
      sale: 95000,
      img: "https://res.cloudinary.com/dkcetq9et/image/upload/v1715280191/framesaurieng_e8imc5.jpg",
    },
    {
      id: 3,
      name: "Muối Tôm Như Ý – Mặn Mòi Vị Muối Tây Ninh",
      price: 17000,
      sale: 15000,
      img: "https://res.cloudinary.com/dkcetq9et/image/upload/v1715280870/muoi-ot-tom-nhu-y-cho-noi-cai-rang-100x100_rw601l.jpg",
    },
    {
      id: 4,
      name: "Gạo hữu cơ - Hạt Ngọc Rồng",
      price: 150000,
      sale: 140000,
      img: "https://res.cloudinary.com/dkcetq9et/image/upload/v1715280237/gaohuuco_r8cfha.jpg",
    },
  ]);
  return (
    <div className="top-sales">
      <ul className="product_list_widget">
        {/* map TopSales */}
        {topSales.map((item) => {
          return (
            <li key={item.id} className="product_list_widget_item">
              <a href="https://chonoicairang.net/san-pham/banh-pia-can-xai-dac-san-soc-trang/">
                <img width="50" height="50" src={item.img} />
                <span className="product-title ">{item.name}</span>
              </a>
              <span className="product-price">
                <del>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol font-medium text-gray-300">
                      {" "}
                      {item.price}₫
                    </span>
                  </span>
                </del>
                <ins style={{ textDecoration: "none" }}>
                  <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol font-medium ">
                      {" "}
                      {item.sale}₫
                    </span>
                  </span>
                </ins>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopSales;

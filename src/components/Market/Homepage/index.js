import MarketplaceLayout from "layouts/CustomerLayout/MarketplaceLayout";
import "./style.scss";
import MenuProduct from "./MenuProduct";
import Contact from "./Contact";
import HotSales from "./HotSales";
import ListProduct from "./ListProduct";
import Review from "./Review";
import Blogs from "./Blogs";

const Homepage = () => {
  return (
    <MarketplaceLayout>
      <div className="container-content">
        <div className="content">
          <section className="section">
            <MenuProduct />
          </section>
          <section className="section">
            <Contact />
          </section>
          <section className="section">
            <HotSales />
          </section>
          <section className="section">
            <ListProduct />
          </section>
          <section className="section">
            <Review />
          </section>
          <section className="section">
            <Blogs />
          </section>
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Homepage;

import Article from "./Article";
import "./style.scss";
import React from "react";

const Blogs = () => {
  return (
    <div className="container-blogs">
      <div className="blogs">
        <div className="blogs__blank"></div>
        <div className="blogs__title">
          <b></b>
          <div className="blogs__title--text">
            <h2>BLOGS</h2>
          </div>
          <b></b>
        </div>
        <div className="blogs__content">
          <Article />
          <Article />
          <Article />
          <Article />
        </div>
      </div>
    </div>
  );
};

export default Blogs;

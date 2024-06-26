import "./style.scss";

const Article = () => {
  return (
    <div className="container-article">
      <div className="article">
        <div className="article-infor">
          <div className="article__img">
            <img src="https://res.cloudinary.com/dkcetq9et/image/upload/v1715278368/tham-quan-cho-noi-cai-rang-bang-ghe-xuong-720x536_ncmkkt.jpg" />
          </div>
          <div className="article__content">
            <div className="article__content--name">
              <p>Một Ngày Ở Chợ Nổi Cái Răng Cần Thơ</p>
              <div className="is-divider"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;

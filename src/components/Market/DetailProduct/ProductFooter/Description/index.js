import "./style.scss";
import parse from "html-react-parser";
import React from "react";

const Description = (props) => {
  const { description } = props;

  return (
    <div className="container-description">
      {description ? parse(description) : ""}
    </div>
  );
};

export default Description;

import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import parse from "html-react-parser";
import TextEditor from "components/Common/TextEditor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const TourInformation = ({ tourInformation, setTourData }) => {

  const [information, setInformation] = useState(tourInformation)

  useEffect(() => {
    setTourData((prev) => ({
      ...prev,
      tourInformation: information,
    }));
  }
    , [information, setTourData]);

  return (
    <div className="overflow-y-auto" style={{ height: "500px" }}>
      <h5 className="border-bottom pb-2 mb-3 mt-3">
        <strong>Thông Tin Tour</strong>
      </h5>
      <Form.Group className="mb-3" controlId="description">
        <TextEditor
          information={information}
          setInformation={setInformation}
        />
      </Form.Group>
    </div>
  );
};

export default TourInformation;

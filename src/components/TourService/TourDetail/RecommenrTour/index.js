import "./style.scss";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CardTour from "components/TourService/Homepage/TopTour/CardTuor";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const RecommendTour = () => {
  return (
    <div className="container-top-tour">
      <div className="container-title-section">
        <div className="grid-toptuor">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(3)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item>
                    <CardTour />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
        <div className="btn-toptuor">
          <Link to="/tour/search">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#67A448",
                fontSize: "0.8em",
                fontWeight: "600",
              }}
            >
              Xem tất cả Tour <KeyboardArrowRightIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendTour;

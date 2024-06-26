import "./style.scss";
import TitleSection from "../TitleSection";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardTour from "./CardTuor";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getBestSalerToursInHomePage } from "api/tour";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TopTour = () => {
  const [tours, setTours] = React.useState([]);

  React.useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getBestSalerToursInHomePage();
        setTours(response.data);
      } catch (error) {
        console.log("Failed to fetch tours: ", error);
      }
    };
    fetchTours();
  }, []);
  return (
    <div className="container-top-tour">
      <div className="container-title-section">
        <div className="title-toptuor">
          <TitleSection title={"TOUR NỔI BẬT"} />
        </div>
        <div className="grid-toptuor">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {tours.map((tour) => (
                <Grid item xs={2} sm={4} md={4} key={tour._id}>
                  <Item>
                    <CardTour tour={tour} />
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

export default TopTour;

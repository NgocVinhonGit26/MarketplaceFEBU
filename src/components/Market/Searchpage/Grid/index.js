import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import CardProduct from "components/Market/Homepage/ListProduct/SliderProduct/CardProduct";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function GridTable({ products }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {products?.map((item, index) => (
          <Grid key={index} xs={6} md={3}>
            <CardProduct item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

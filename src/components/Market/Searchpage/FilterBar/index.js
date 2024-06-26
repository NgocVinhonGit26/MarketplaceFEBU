import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const FilterBar = (props) => {
  const {
    cost,
    setCost,
    minDistance,
    minPrice = 10000,
    maxPrice = 2000000,
  } = props;

  const handleChange1 = (event, newValue, activeThumb) => {
    //gia tri 2 cuc
    // console.log(cost[0])
    // console.log(cost[1])

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setCost([Math.min(newValue[0], cost[1] - minDistance), cost[1]]);
    } else {
      setCost([cost[0], Math.max(newValue[1], cost[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={cost}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        max={maxPrice}
        min={minPrice}
      />
    </Box>
  );
};

export default FilterBar;

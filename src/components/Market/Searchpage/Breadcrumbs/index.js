import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function BasicBreadcrumbs({ name, category }) {
  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Cửa hàng
        </Link>
        <Typography color="text.primary">
          {name && <>Kết quả tìm kiếm cho "{name}"</>}
          {category?.name && <>{category?.name}</>}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

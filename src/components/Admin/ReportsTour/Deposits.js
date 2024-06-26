import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ item }) {
  if (!item) return null;

  if (item.title === "Số đơn") {
    return (
      <React.Fragment>
        <Title>
          <ReceiptLongIcon color='success' style={{ marginRight: "5px" }} />
          {item.title}
        </Title>
        <Typography component="p" variant="h4" align='center'>
          {item.value}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {/* {Date().toISOString().slice(0, 19).replace("T", " ")} */}
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View balance
          </Link>
        </div>
      </React.Fragment>
    );
  }

  if (item.title === "Doanh thu") {
    return (
      <React.Fragment>
        <Title>
          <LocalAtmIcon color='success' style={{ marginRight: "5px" }} />
          {item.title}
        </Title>
        <Typography component="p" variant="h4" align='center'>
          {item.value < 1000 ? item.value === null ? 0 : item.value : item.value.toLocaleString('vi-VN')}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {/* {Date().toISOString().slice(0, 19).replace("T", " ")} */}
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View balance
          </Link>
        </div>
      </React.Fragment>
    );
  }

  if (item.title === "Đơn hủy") {
    return (
      <React.Fragment>
        <Title>
          <RemoveShoppingCartIcon color='error' style={{ marginRight: "5px" }} />
          {item.title}
        </Title>
        <Typography component="p" variant="h4" align='center'>
          {item.value}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {/* {Date().toISOString().slice(0, 19).replace("T", " ")} */}
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View balance
          </Link>
        </div>
      </React.Fragment>
    );
  }

  if (item.title === "Lợi nhuận") {
    return (
      <React.Fragment>
        <Title>
          <LocalAtmIcon color='info' style={{ marginRight: "5px" }} />
          {item.title}
        </Title>
        <Typography component="p" variant="h4" align='center'>
          {item.value < 1000 ? item.value === null ? 0 : item.value : item.value.toLocaleString('vi-VN')}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {/* {Date().toISOString().slice(0, 19).replace("T", " ")} */}
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View balance
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
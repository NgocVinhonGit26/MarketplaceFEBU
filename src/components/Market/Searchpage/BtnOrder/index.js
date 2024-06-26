import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function BtnOrder() {
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-controlled-open-select-label">Sắp xếp</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    label="Sắp xếp"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Độ liên quan</MenuItem>
                    <MenuItem value={20}>Thứ tự theo mức độ phổ biến</MenuItem>
                    <MenuItem value={30}>Thứ tự theo điểm đánh giá</MenuItem>
                    <MenuItem value={40}>Thứ tự theo giá: thấp đến cao</MenuItem>
                    <MenuItem value={50}>Thứ tự theo giá: cao đến thấp</MenuItem>
                    <MenuItem value={50}>Mới nhất</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
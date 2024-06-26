// Trong file slice của bạn
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Cấu trúc của state khởi đầu
};

export const mySlice = createSlice({
    name: 'mySlice',
    initialState,
    reducers: {
        resetState: () => initialState,
        // Các reducers khác
    },
});

// Các action creators sẽ được tạo ra bởi createSlice
export const { resetState } = mySlice.actions;

// Reducer
export default mySlice.reducer;

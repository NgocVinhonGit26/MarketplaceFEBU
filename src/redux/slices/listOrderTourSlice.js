// listOrderTourSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [], // Khởi tạo danh sách rỗng
};

const listOrderTourSlice = createSlice({
    name: 'listOrderTour',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.list.push(action.payload); // Thêm order mới vào danh sách
        },
        // Các reducers khác nếu cần
        //resetList
        resetListOderTour: (state) => {
            state.list = [];
        },
        //removeOrder
        removeOrder: (state, action) => {
            state.list = state.list.filter((item) => item.idOrderTour !== action.payload);
        }
    },
});

export const { addOrder, resetListOderTour, removeOrder } = listOrderTourSlice.actions;
export default listOrderTourSlice.reducer;

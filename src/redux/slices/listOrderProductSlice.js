// listOrderProductSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listProduct: [], // Khởi tạo danh sách rỗng
};

const listOrderProductSlice = createSlice({
    name: 'listOrderProduct',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            state.listProduct.push(action.payload); // Thêm order mới vào danh sách
        },
        // Các reducers khác nếu cần
        //resetList
        resetListOderProduct: (state) => {
            state.listProduct = [];
        },
        //removeOrder
        removeOrderProduct: (state, action) => {
            state.listProduct = state.listProduct.filter((item) => item.id !== action.payload);
        }
    },
});

export const { addOrderProduct, resetListOderProduct, removeOrderProduct } = listOrderProductSlice.actions;
export default listOrderProductSlice.reducer;
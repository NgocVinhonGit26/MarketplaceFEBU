import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 0,
    paymentMethod: "",
    startTime: "",
    quantity: 0,
    tourId: 0,
    userId: 0
}

export const orderTourSlice = createSlice({
    name: "orderTour",
    initialState,
    reducers: {
        setOrderTourRD: (state, action) => {
            state.status = action.payload.status;
            state.paymentMethod = action.payload.paymentMethod;
            state.startTime = action.payload.startTime;
            state.quantity = action.payload.quantity;
            state.tourId = action.payload.tourId;
            state.userId = action.payload.userId;
            // return [...action.payload];
        }
        ,
        setOrderTourDefault: (state) => {
            state.status = 0;
            state.paymentMethod = "";
            state.startTime = "";
            state.quantity = 0;
            state.tourId = 0;
            state.userId = 0;
            // return initialState;
        }
    }
})

export const { setOrderTourRD, setOrderTourDefault } = orderTourSlice.actions;

export default orderTourSlice.reducer;
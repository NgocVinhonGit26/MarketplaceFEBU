import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import orderTourSlice from "./slices/orderTourSlice";
import mySlice from "./slices/mySlice";
import listOrderTourSlice from "./slices/listOrderTourSlice";
import listOrderProductSlice from "./slices/listOrderProductSlice";



const persistConfig = {
    key: "root",
    storage,
};
const user = persistReducer(persistConfig, userSlice);
const orderTour = persistReducer(persistConfig, orderTourSlice);
const listOrderTour = persistReducer(persistConfig, listOrderTourSlice);
const mySlices = persistReducer(persistConfig, mySlice);
const listOrderProduct = persistReducer(persistConfig, listOrderProductSlice);

export const store = configureStore({
    reducer: {
        user,
        orderTour,
        listOrderTour,
        mySlices,
        listOrderProduct

    },
    middleware: [thunk],
});
export const persistor = persistStore(store);
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    role: "",
    token: "",
    name: "",
    id: 0,
    avatar: "",
    email: "",
    phone: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.id = action.payload.id;
            state.avatar = action.payload.avatar;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        setUserDefault: (state) => {
            state.role = "";
            state.token = "";
            state.name = "";
            state.id = 0;
            state.avatar = "";
            state.email = "";
            state.phone = "";
        }
    }
})

export const { setUser, setUserDefault } = userSlice.actions;

export default userSlice.reducer;
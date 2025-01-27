import { createSlice } from "@reduxjs/toolkit";

const userData = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  };

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: userData(),
        token: localStorage.getItem("token") || null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", state.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
        },
    },
}); 

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

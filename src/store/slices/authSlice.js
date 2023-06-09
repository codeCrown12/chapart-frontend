import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: {},
    userToken: null,
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.userData = action.payload.userData
        },
        loginUser: (state, action) => {
            state.userData = action.payload.userData
            state.userToken = action.payload.userToken
            state.isLoggedIn = true
            localStorage.setItem("token", action.payload.userToken)
        },
        logoutUser: (state) => {
            state.userData = {}
            state.userToken = null
            state.isLoggedIn = false
            localStorage.clear()
        }
    }
})

export const { loginUser, logoutUser, updateUser } = authSlice.actions

export default authSlice.reducer
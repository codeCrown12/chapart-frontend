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
        loginUser: (state, action) => {
            state.userData = action.payload.userData
            state.userToken = action.payload.userToken
            state.isLoggedIn = true
        },
        logoutUser: (state) => {
            state.userData = {}
            state.userToken = null
            state.isLoggedIn = false
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer
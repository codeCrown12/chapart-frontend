import axios from "axios"
import { logoutUser } from "@/store/slices/authSlice"
import { notifications } from "@mantine/notifications"
import { store } from "@/store/store"

// Axios instance for unprotected requests
export const httpEntry = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

// Axios instance for protected requests
export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

const state = store.getState()

http.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${state.auth.userToken}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

http.interceptors.response.use(
    response => {
        return response
    },
    async (error) => {
        if(error.response.status === 401) {
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Session ended login to continue!',
            })
            store.dispatch(logoutUser())
            window.location.href = '/auth/login'
        }
        return Promise.reject(error)
    }
)
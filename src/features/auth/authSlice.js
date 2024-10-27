import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {username: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const {username, accessToken} = action.payload
            state.username = username
            state.token = accessToken
        },
        // eslint-disable-next-line no-unused-vars
        logout: (state, action) => {
            state.username = null
            state.token = null
        }
    },
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.username
export const selectCurrentToken = (state) => state.auth.token



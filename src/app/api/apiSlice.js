import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log('result dari apiSlice.js: ', result);

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token');

        // send refresh token to get new access token:
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log('refreshResult dari apiSlice.js: ', refreshResult);

        if (refreshResult?.data) {
            const username = api.getState().auth.username

            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, username }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
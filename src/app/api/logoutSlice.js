import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const logoutApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: builder => ({
        logout: builder.mutation({
            query: () => ({
                url: '/auth',
                method: 'GET',
            })
        })
    })
})

export const { useLogoutMutation } = logoutApiSlice
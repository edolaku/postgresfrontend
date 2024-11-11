import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const logoutApiSlice = createApi({
    reducerPath: 'logoutApi', // Unik untuk slice ini
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
        credentials: 'include',
    }),
    endpoints: builder => ({
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
        }),
    }),
});

export const { useLogoutMutation } = logoutApiSlice;

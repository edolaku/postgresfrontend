import { apiSlice } from "../../app/api/apiSlice";

export const persistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        restoreUser: builder.query({
            query: () => ({
                url: '/refresh',
                method: 'GET',
            })
        }),
    })
})

export const { useRestoreUserQuery } = persistApiSlice
import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
            }),
            // berapa lama RTK Query akan menyimpan data Anda dalam cache setelah komponen terakhir unsubscribes-
            // pada kode ini adalah 5 detik:
            keepUnusedDataFor: 30,
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice 
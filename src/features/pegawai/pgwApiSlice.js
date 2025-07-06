import { apiSlice } from "@/app/api/apiSlice"

export const pgwApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPgw: builder.query({
            query: () => ({
                url: `/pgw`,
            }),
            // berapa lama RTK Query akan menyimpan data Anda dalam cache setelah komponen terakhir unsubscribes-
            // pada kode ini adalah 5 detik:
            // keepUnusedDataFor: 5,
        })
    })
})

export const { useGetPgwQuery } = pgwApiSlice 
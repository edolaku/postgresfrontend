import { apiSlice } from "@/app/api/apiSlice"

export const pgwByIdApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPgwId: builder.query({
            query: (id) => ({
                url: `/pgw/${id}`,
            }),
            // berapa lama RTK Query akan menyimpan data Anda dalam cache setelah komponen terakhir unsubscribes-
            // pada kode ini adalah 5 detik:
            // keepUnusedDataFor: 5,
        })
    })
})

export const { useGetPgwIdQuery } = pgwByIdApiSlice
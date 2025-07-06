import { apiSlice } from "@/app/api/apiSlice";

export const pgwDeleteApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        deletePgw: builder.mutation({
            query: (id) => ({
                url: `/pgw/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const { useDeletePgwMutation } = pgwDeleteApiSlice
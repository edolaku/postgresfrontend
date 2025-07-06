import { apiSlice } from "@/app/api/apiSlice";

export const pgwEditApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        editPgw: builder.mutation({
            query: ({id, ...credentials}) => ({
                url: `/pgw/${id}`,
                method: 'PUT',
                body: credentials
            })
        }),
    })
})

export const { useEditPgwMutation } = pgwEditApiSlice
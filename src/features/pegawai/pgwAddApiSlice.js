import { apiSlice } from "@/app/api/apiSlice";

export const pgwApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addPgw: builder.mutation({
            query: credentials => ({
                url: '/pgw',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const { useAddPgwMutation } = pgwApiSlice
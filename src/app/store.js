import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice"; // Slice utama
import { logoutApiSlice } from "./api/logoutSlice"; // Slice logout
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Slice API umum
        [logoutApiSlice.reducerPath]: logoutApiSlice.reducer, // Slice logout
        auth: authReducer, // State auth
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(logoutApiSlice.middleware), // Tambahkan middleware logout
    devTools: true,
});




// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/apiSlice";
// import authReducer from "../features/auth/authSlice"

// export const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer
//     },
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true
// })
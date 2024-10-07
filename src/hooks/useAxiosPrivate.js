// AXIOS INTERCEPTORS

import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    // console.log("auth dari useAxiosPrivate: ", auth);
    

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                // console.log('config dari useAxiosPrivate: ', config.headers.Authorization);
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                // console.log(`prevRequest dari useAxiosPrivate: `, prevRequest);
                // console.log(`error dari useAxiosPrivate: `, error);
                // jika error.response.status = 403(token expired), dan prevRequest.sent = false, maka kirim request baru dengan refresh token
                // prevRequest.sent = false artinya request ini sudah dikirim
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    // untuk mencegah pengulangan request tak terbatas:
                    prevRequest.sent = true;
                    // console.log(`prevRequest.sent dari useAxiosPrivate: `, prevRequest);
                    const newAccessToken = await refresh();
                    // console.log(`newAccessToken dari useAxiosPrivate: `, newAccessToken);
                    // Memperbarui Authorization header dengan token yang baru:
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    // console.log(`prevRequest.headers dari useAxiosPrivate: `, prevRequest.headers);

                    return axiosPrivate(prevRequest);
                }
                // Jika error tidak terkait 403 Forbidden atau setelah token diperbarui, tetap terjadi error, maka request akan direject:
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    }, [auth, refresh])

    return axiosPrivate;
}


export default useAxiosPrivate
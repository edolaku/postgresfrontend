import { useState } from "react";
import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const [getAuth, setGetAuth] = useState({});


    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true,
            })
            console.log('response dari useRefreshToken: ', JSON.stringify(response.data.username));
            // console.log('proses refresh token dari useRefreshToken');
            setGetAuth(response.data);
            console.log('getAuth dari useRefreshToken: ', getAuth.username);

            setAuth(prev => {
                // console.log('prev dari useRefreshToken: ', prev);
                // console.log('response.data dari useRefreshToken: ', response.data);

                return { ...prev, ...response.data }
            })
            return response.data.accessToken
        } catch (error) {
            if (error.name === 'CanceledError') {
                console.log('error1 dari useRefreshToken: ', error);
            } else {
                console.log('error2 dari useRefreshToken: ', error);
            }
        }
    }
    // console.log('refresh dari useRefreshToken: ', refresh());
    return refresh
}

export default useRefreshToken


// KODE LAMA:
// const refresh = async () => {
//     const response = await axios.get('/refresh', {
//         withCredentials: true
//     })

//     console.log('response dari useRefreshToken: ', response.data);
//     setAuth(prev => {
//         // console.log('prev dari useRefreshToken: ', JSON.stringify(prev))
//         // console.log('response.data dari useRefreshToken: ', JSON.stringify(response.data));
//         return {
//             ...prev,
//             role: response.data.role,
//             bidang: response.data.bidang,
//             accessToken: response.data.accessToken
//         }
//     })
//     console.log('accessToken dari useRefreshToken: ', response);
//     return response.data
// }
// // console.log('refresh dari useRefreshToken: ', refresh());
// return refresh
// }
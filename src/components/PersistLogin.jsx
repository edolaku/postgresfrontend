import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

// PersistLogin digunakan agar user tidak diarahkan ke halaman login setelah merefresh halaman selagi access token atau refresh token masih aktif


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const verifyRefreshToken = async () => {
            try {
                const signal = controller.signal
                // console.log('proses refresh token dari PersistLogin');
                await refresh(signal);
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
                // console.log('auth dari PersistLogin: ', auth);
                console.log('ismounted dari PersistLogin: ', isMounted);

            }
        }
        console.log('auth dari PersistLogin: ', JSON.stringify(auth));


        !auth?.accessToken ?
            verifyRefreshToken() :
            // console.log('proses verify refresh token dari PersistLogin'):
            setIsLoading(false);

        return () => {
            isMounted = false
            controller.abort()
        };
    }, [refresh]);

    // useEffect(() => {
    //     console.log(`auth dari PersistLogin: ${JSON.stringify(auth)}`);
    //     console.log(`isLoading dari PersistLogin: ${isLoading}`);
    // }, [auth, isLoading]);

    return (
        <>
            {/* <Outlet /> merepresentasikan semua child component atau route child didalamnya */}
            {isLoading ? <p>Loading...</p> : <Outlet />}
            {/* {auth?.accessToken ? <Outlet /> : <p>Loading...</p>} */}
        </>
    )
}

export default PersistLogin
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

// PersistLogin digunakan agar user tidak diarahkan ke halaman login setelah merefresh halaman selagi access token atau refresh token masih aktif


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        // const controller = new AbortController();
        const verifyRefreshToken = async () => {
            try {
                // const signal = controller.signal
                // console.log('proses refresh token dari PersistLogin');
                await refresh();
                // console.log('auth dari PersistLogin: ', JSON.stringify(auth));
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
                // console.log('auth dari PersistLogin: ', auth);
                console.log('ismounted dari PersistLogin: ', isMounted);

            }
        }
        // console.info('auth dari PersistLogin: ', JSON.stringify(auth));

        if (!auth?.accessToken) {
            verifyRefreshToken();
            console.log('proses verify refresh token dari PersistLogin')
        } else {
            setIsLoading(false);
        };

        return () => {
            isMounted = false
            // controller.abort()
        }
    }, [auth?.accessToken, refresh, isLoading]
    )

    // useEffect(() => {
    //     console.log(`auth dari PersistLogin: ${JSON.stringify(auth)}`);
    //     console.log(`isLoading dari PersistLogin: ${isLoading}`);
    // }, [auth, isLoading]);

    return (
        <>
            {/* <Outlet /> merepresentasikan semua child component atau route child didalamnya */}
            {
                // jika persist falsy, maka render <Outlet /> yang tidak menggunakan refresh token-
                // sehingga akan logout
                // jika persist truthy, maka render cek isLoading, jika isLoading dicek, maka akan-
                // melakukan proses refresh token, sehingga jika access token atau refresh token-
                // masih aktif, akan tetap login
                !persist
                    ? <Outlet />
                    : isLoading
                        ? <p>Loading...</p>
                        : <Outlet />
            }
            {/* {auth?.accessToken ? <Outlet /> : <p>Loading...</p>} */}
        </>
    )
}

export default PersistLogin
import { useDispatch, useSelector } from "react-redux";
import { useRestoreUserQuery } from "./persistApiSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken, setCredentials } from "../auth/authSlice";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const PersistLogin = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const tokenExist = useSelector(selectCurrentToken)
    const persistResult = useRestoreUserQuery(undefined, { skip: !!tokenExist })

    // State untuk melacak apakah data sedang diproses
    const [isLoading, setIsLoading] = useState(true);

    // console.log('persistResult Boolean dari PersistLogin: ', Boolean(persistResult.data?.accessToken));
    // console.log('persistResult dari PersistLogin: ', persistResult);
    // console.log('isLoading persistResult dari PersistLogin: ', JSON.stringify(persistResult.data?.accessToken));
    // console.log('tokenExist dari PersistLogin: ', Boolean(tokenExist));
    // console.log('usernameExist dari PersistLogin: ', usernameExist);


    useEffect(() => {
        if (!tokenExist) {
            // Jika ada data dari persistResult, dekode token dan set credentials
            if (persistResult.data?.accessToken) {
                const decoded = jwtDecode(persistResult.data.accessToken);
                dispatch(
                    setCredentials({
                        accessToken: persistResult.data.accessToken,
                        username: decoded.userInfo.username,
                    })
                );
                setIsLoading(false);
            } else if (persistResult.isError || !persistResult.isLoading) {
                // Jika query gagal atau selesai tapi tidak ada data
                setIsLoading(false);
            }
        } else {
            // Jika token sudah ada, langsung set isLoading ke false
            setIsLoading(false);
        }
    }, [tokenExist, persistResult, dispatch]);


    let content
    if (isLoading || persistResult.isLoading) {
        console.log("loading dari PersistLogin : ", isLoading, persistResult.isLoading);

        content = <p>Loading...</p>
    } else {
        if (!tokenExist) {
            console.log("persist result not ok");
            return <Navigate to="/login" state={{ from: location }} replace />
        } else {
            console.log("persist result ok");
            content = <Outlet />
        }
    }

    return content

    // return (
    // <>

    // {
    // persistResult.isLoading
    //     ? <p>Loading...</p>
    //     // : !persistResult.data?.accessToken
    //     // : !tokenExist
    //     : !persistResult.data?.accessToken
    //         // ? <Navigate to="/login" state={{ from: location }} replace />
    //         ? <Navigate to="/login" state={{ from: location }} replace />
    //         : <Outlet />
    // }

    // </>
    // )
}

export default PersistLogin
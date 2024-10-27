import { useRestoreUserQuery } from "./persistApiSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PersistLogin = () => {
    const location = useLocation();
    const persistResult = useRestoreUserQuery()
    console.log('persistResult dari PersistLogin: ', persistResult.data?.accessToken);
    console.log('isLoading persistResult dari PersistLogin: ', JSON.stringify(persistResult.isLoading));

    return (
        <>
            {/* <p>PersistLogin</p> */}
            {
                persistResult.isLoading
                    ? <p>Loading...</p>
                    : !persistResult.data?.accessToken
                        // ? <Navigate to="/login" state={{ from: location }} replace />
                        ? <Navigate to="/login" state={{ from: location }} replace />
                        : <Outlet />
            }

        </>
    )
}

export default PersistLogin
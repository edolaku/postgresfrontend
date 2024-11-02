/* eslint-disable no-unused-vars */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from 'jwt-decode'

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    // Jika token belum ada, tunggu hingga Redux state terupdate
    if (!token) {
        // Bisa merender placeholder atau null sementara menunggu token tersedia
        console.log('tunggu');
        return null;
        // return <p>Loading...</p>;
    }

    const decoded = token ? jwtDecode(token) : null
    console.log('decoded dari RequireAuth: ', decoded);


    const role = decoded ? decoded.userInfo.role : []
    const bidang = decoded ? decoded.userInfo.bidang : []


    // eslint-disable-next-line react/prop-types
    const result = allowedRoles.some(r => role?.includes(r))
    console.log('result dari RequireAuth: ', result);


    return (
        result
            ? <Outlet />
            : token
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
import { useLogoutMutation } from "@/app/api/logoutSlice";
import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";


const Logout = () => {
    const dispatch = useDispatch();


    const response = useLogoutMutation();
    console.log('response dari useLogout: ', response);
    dispatch(logout());
    localStorage.removeItem('token');
    console.log('response dar Logout.jsx: ', response);


    return (
        <Navigate to="/Login" />
    );
}

export default Logout
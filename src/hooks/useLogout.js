import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/app/api/logoutSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/authSlice";


const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const response = useLogoutMutation();
    console.log('response dari useLogout: ', response);
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
    return response;
}

export default useLogout
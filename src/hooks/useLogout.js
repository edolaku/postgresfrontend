import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await axios('/logout',
                {
                    withCredentials: true
                })
            console.log('response dari logout: ', response);
            setAuth({});
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    return logout
}

export default useLogout
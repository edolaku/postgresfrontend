import { useLogoutMutation } from "@/app/api/logoutSlice"; // Import dari logoutSlice
import { logout } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const [logoutApi, { isLoading, isSuccess, isError, data, error }] = useLogoutMutation();
    console.log('data dari Logout.jsx: ', data);
    
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await logoutApi().unwrap(); // Panggil endpoint dan dapatkan respons
            console.log('Response dari backend:', response); // Lihat respons dari backend
            
            dispatch(logout()); // Reset auth state di Redux
            localStorage.removeItem('token'); // Hapus token dari localStorage
        } catch (err) {
            console.error("Logout failed:", err); // Tangani error
        }
    };

    useEffect(() => {
        handleLogout(); // Jalankan logout saat komponen dipasang
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error during logout: {error.data?.message || error.error}</p>;
    }

    return isSuccess ? <Navigate to="/login" replace /> : null;
};

export default Logout;



// import { useLogoutMutation } from "@/app/api/logoutSlice"; // Pastikan path benar
// import { logout } from "@/features/auth/authSlice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";

// const Logout = () => {
//     const [logoutApi] = useLogoutMutation(); // Mutasi API untuk logout
//     // const [logoutApi, { isLoading, isSuccess, isError, error }] = useLogoutMutation();
//     const dispatch = useDispatch();
//     // console.log('logoutApi dari Logout.jsx: ', logoutApi);
    

//     const handleLogout = async () => {
//         try {
//             await logoutApi().unwrap(); // Panggil endpoint logout
//             dispatch(logout()); // Reset auth state
//             localStorage.removeItem('token'); // Opsional
//         } catch (error) {
//             console.error("Logout failed: ", error);
//         }
//     };

//     useEffect(() => {
//         handleLogout(); // Jalankan logout saat komponen dipasang
//     }, []);

//     return <Navigate to="/login" replace />;
// };

// export default Logout;


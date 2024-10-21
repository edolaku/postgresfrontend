import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

// ambil allowedRoles dari app.jsx
// eslint-disable-next-line react/prop-types
const RequireAuth = ({ allowedRoles }) => {
    // console.log("allowedRoles dari RequireAuth: ", allowedRoles);
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken
        ? jwtDecode(auth.accessToken)
        : undefined;

    const role = decoded?.userInfo?.role || [];
    const username = decoded?.userInfo?.username || [];
    const bidang = decoded?.userInfo?.bidang || [];

    // eslint-disable-next-line react/prop-types
    const result = allowedRoles.some(r => role?.includes(r));
    // console.log("result dari RequireAuth: ", result);
    console.log("auth dari RequireAuth: ", auth);



    return (
        // ambil role dari user yg login
        // auth?.role?.includes(allowedRoles)
        result
            ?
            <Outlet />
            : username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth


// <Navigate to="/login" />: Ini adalah komponen dari React Router yang digunakan untuk mengarahkan pengguna ke rute lain secara programatis. Dalam kasus ini, jika pengguna tidak terautentikasi (auth?.user bernilai false), maka pengguna akan diarahkan ke halaman /login.

//  state={{ from: location }}: state digunakan untuk mengirim data tambahan saat melakukan navigasi. Pada contoh ini, state={{ from: location }} mengirimkan objek location (yang merepresentasikan rute saat ini) sebagai nilai from; location berisi informasi tentang rute yang sedang diakses saat ini, seperti pathname dan parameter pencarian (search query); Tujuan dari mengirimkan state ini adalah untuk menyimpan lokasi halaman yang pengguna coba akses sebelum diarahkan ke halaman login. Setelah login, aplikasi dapat mengarahkan pengguna kembali ke halaman asal yang mereka coba akses.

// replace: Properti replace memastikan bahwa saat navigasi terjadi, itu tidak menambahkan entri baru di riwayat peramban (browser history). Artinya, pengguna tidak bisa menekan tombol "back" untuk kembali ke halaman yang tidak diizinkan (halaman sebelum login); Tanpa replace, redireksi ini akan menambahkan entri baru ke riwayat, sehingga pengguna bisa kembali ke halaman yang tidak terautentikasi dengan menekan tombol "back", yang dapat menyebabkan perilaku yang tidak diinginkan.
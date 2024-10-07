import { createContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist") || "false"));

    // console.log("auth dari AuthProvider: ", auth);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {/* {console.log("auth dari AuthProvider: ", auth)} */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
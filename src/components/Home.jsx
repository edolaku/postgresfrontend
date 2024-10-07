import { Link } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useLogout from "../hooks/useLogout";



const Home = () => {
    const refresh = useRefreshToken();
    const logout = useLogout();


    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>

            <br />
            <button onClick={() => refresh()}>Refresh Token</button>

            <div className="flexGrow">
                <button onClick={() => logout()}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
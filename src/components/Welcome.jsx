import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../features/auth/authSlice";
import { Link } from "react-router-dom";


const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    console.log('user dari welcome: ', user);

    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}` : 'Welcome Guest'
    const tokenAbbreviation = token ? `(${token.slice(0, 9)}...)` : ''

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbreviation}</p>
            <p><Link to="/users">Users List</Link></p>
        </section>
    )
    return content
}

export default Welcome
import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom"
// import axios from "../api/axios"

const Users = () => {
        
    const [users, setUsers] = useState()
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                })
                console.log("response dari Users: ", response)
                isMounted && setUsers(response.data)
            } catch (error) {
                // console.error(error)
                console.log('error dari Users ', error.response?.status)
                // console.log('error dari Users ', error.name)
                if (error?.name === 'CanceledError' || error?.response?.status === 403) {
                    console.error(error)
                } else {
                    console.log('error dari Users ', error);
                    navigate('/login', { state: { from: location }, replace: true })
                    
                }
            }
        }

        getUsers()

        return () => {
            isMounted = false;
            controller.abort();
            // console.log('isMounted dari Users: ', isMounted);
        }
    }, [axiosPrivate, navigate, location])

    return (
        <article>
            <h2>Users List</h2>
            {
                users?.length ? (
                    <ul>
                        {
                            users.map((user, index) => (
                                <li key={index}>
                                    {user?.username}
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <p>No users</p>
                )
            }
        </article>
    )
}

export default Users
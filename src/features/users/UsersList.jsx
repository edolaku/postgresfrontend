import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content
    if (isLoading) {
        content = <p>Loadingggggg...</p>
    } else if (isSuccess) {
        content = (
            <section className="users">
                <ul>
                    {
                        users.map((user, i) => {
                            return <li key={i}>{user.username}</li>
                        })
                    }
                </ul>
                <Link to="/welcome">Back</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }
    return (
        <>
            <h1>Users List</h1>
            {content}
        </>
    )
}

export default UsersList

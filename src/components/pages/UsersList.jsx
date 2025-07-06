import { useGetUsersQuery } from "../../features/users/usersApiSlice";
import { Link } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect } from "react";


const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetUsersQuery()
    console.log('users dari UsersList: ', users);

    useEffect(() => {
        refetch()
    }, [refetch])


    let content
    if (isLoading) {
        content = (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={4}>
                        <Skeleton className="h-10" />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4}>
                        <Skeleton className="h-10" />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4}>
                        <Skeleton className="h-10" />
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    } else if (isSuccess) {
        content = (
            <TableBody>
                {users.map((user, i) => {
                    return (
                        <TableRow key={i}>
                            <TableCell >{i + 1}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.bidang}</TableCell>
                            <TableCell className="text-left">{user.role}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        )
    } else if (isError) {
        content = (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={3}>
                        {error?.data?.message}
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }


    return (
        <div>
            <Table className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
                <TableCaption>List Users</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead style={{ width: '8%' }} className="text-left">No</TableHead>
                        <TableHead style={{ width: '35%' }} className="text-left">Nama</TableHead>
                        <TableHead style={{ width: '35%' }} className="text-left">Bidang</TableHead>
                        <TableHead style={{ width: '22%' }} className="text-left">Role</TableHead>
                    </TableRow>
                </TableHeader>
                {content}
            </Table>
        </ div>
    )
}

export default UsersList
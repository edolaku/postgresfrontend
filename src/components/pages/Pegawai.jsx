import { useGetPgwQuery } from "@/features/pegawai/pgwApiSlice";
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
import { Button } from "../ui/button";
import { useEffect } from "react";
import { ComboboxDropdownMenu } from "../ui/dropdownMenu";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import { useDeletePgwMutation } from "@/features/pegawai/pgwDeleteApiSlice";


const PgwList = () => {
    const {
        data: pgw,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetPgwQuery()


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
        console.log('createdAt dari UsersList: ', pgw);

        content = (
            <TableBody>
                {pgw
                    .slice()
                    // .sort((a, b) => a.nama.localeCompare(b.nama)) // jika urutan berdasarkan alfabet nama
                    .sort((a, b) => a.id - b.id) // jika urutan berdasarkan id
                    .map((user, i) => {
                        const date = new Date(user.createdAt)
                        const day = date.getDate();
                        const month = date.toLocaleString('default', { month: 'long' });
                        const year = date.getFullYear();
                        return (
                            <TableRow key={i}>
                                <TableCell >{i + 1}</TableCell>
                                <TableCell>{user.nama}</TableCell>
                                <TableCell>{`${user.nip.substr(0, 8)} ${user.nip.substr(8, 6)} ${user.nip.substr(14, 1)} ${user.nip.substr(15, 3)}`}</TableCell>
                                <TableCell>{user.jabatan}</TableCell>
                                <TableCell>{user.bidang}</TableCell>
                                <TableCell>{user.pangkat}</TableCell>
                                <TableCell>{`${day} ${month} ${year}`}</TableCell>
                                <TableCell>
                                    <ComboboxDropdownMenu>
                                        <DropdownMenuGroup>

                                            <Link to={`/pegawai/edit/${user.id}`}>
                                                <DropdownMenuItem>
                                                    Edit
                                                </DropdownMenuItem>
                                            </Link>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => {
                                                    handleDeletePgw(user.id)
                                                }}
                                            >
                                                Delete
                                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                            </DropdownMenuItem>

                                        </DropdownMenuGroup>
                                    </ComboboxDropdownMenu>
                                </TableCell>
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

    const [deletePgw] = useDeletePgwMutation()
    const handleDeletePgw = async (id) => {
        await deletePgw(id)
        console.log(id);
        refetch()
    }


    return (
        <div>
            <Button asChild variant="outline" className="mb-4 float-right bg-sky-300">
                <Link to="/pegawai/addpegawai">Tambah Pegawai</Link>
            </Button>

            <Table className="w-full max-w-5xl bg-white shadow-lg rounded-lg">
                <TableCaption>List Pegawai</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead style={{ width: '2%' }}>No</TableHead>
                        <TableHead style={{ width: '20%' }}>Nama</TableHead>
                        <TableHead style={{ width: '18%' }}>NIP</TableHead>
                        <TableHead style={{ width: '20%' }}>Jabatan</TableHead>
                        <TableHead style={{ width: '12%' }}>Bidang</TableHead>
                        <TableHead style={{ width: '14%' }}>Pangkat</TableHead>
                        <TableHead style={{ width: '12%' }}>Tanggal Dibuat</TableHead>
                        <TableHead style={{ width: '2%' }}>Opsi</TableHead>
                    </TableRow>
                </TableHeader>
                {content}
            </Table>
        </ div>
    )
}

export default PgwList
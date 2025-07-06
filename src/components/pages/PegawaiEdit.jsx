import { useEffect, useRef, useState } from "react"
import { Label } from "../ui/label"
import { useParams } from "react-router-dom"
import { useGetPgwIdQuery } from "@/features/pegawai/pgwByIdApiSlice"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { useEditPgwMutation } from "@/features/pegawai/pgwEditApiSlice"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const PegawaiEdit = () => {

    const { id } = useParams()
    console.log('id dari PegawaiEdit.jsx: ', id);

    const {
        data: pgw,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetPgwIdQuery(id)
    // const errRef = useRef()

    const [nama, setNama] = useState('')
    const [nip, setNip] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [pangkat, setPangkat] = useState('')
    const [bidang, setBidang] = useState('')

    const [editPgw, { isLoading: isLoadingEdit, error: errorEdit }] = useEditPgwMutation()

    useEffect(() => {
        refetch()
        if (isSuccess) {
            console.log('pgw dari PegawaiEdit.jsx: ', pgw[0].nama);
            setNama(pgw[0].nama)
            setNip(pgw[0].nip)
            setJabatan(pgw[0].jabatan)
            setPangkat(pgw[0].pangkat)
            setBidang(pgw[0].bidang)
        }
    }, [isSuccess, pgw, refetch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await editPgw({ id, nama, nip, jabatan, pangkat, bidang }).unwrap()
            console.log('id dari PegawaiEdit.jsx: ', id);
            // console.log('userData dari login: ', userData);
            // console.log('username dari login: ', username);
            setNama('')
            setNip('')
            setJabatan('')
            setPangkat('')
            setBidang('')
        } catch (error) {
            console.log('error dari login: ', error);
            //     if (!error?.status) {
            //         // console.log('error dari login: ', error.response);
            //         setErrMsg('No Server Response')
            //     } else if (error.status === 400) {
            //         setErrMsg('Missing Username or Password')
            //     } else if (error.status === 409) {
            //         setErrMsg(error.data.message)
            //     } else {
            //         setErrMsg('Login Failed')
            //     }
            //     errRef.current.focus()
            // }
        }
    }

    const handleNamaInput = (e) => setNama(e.target.value)
    const handleNipInput = (e) => setNip(e.target.value.trim())
    const handleJabatanInput = (e) => setJabatan(e.target.value)
    const handlePangkatInput = (e) => setPangkat(e.target.value)
    const handleBidangInput = (value) => setBidang(value)

    return (
        <div>

            <h1 className='subtitle'>Edit Pegawai</h1>

            {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
            <div className="card is-shadow-less">
                <div className="card-content">
                    <div className="content">

                        <form onSubmit={handleSubmit}>

                            <div className="field mt-4">
                                <Label htmlFor="nama">
                                    Nama
                                </Label>
                                <div className="control">
                                    <Input
                                        className="bg-white w-1/3 border-gray-600"
                                        type="text"
                                        id="nama"
                                        onChange={handleNamaInput}
                                        autoComplete="off"
                                        value={nama}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field mt-4">
                                <Label htmlFor="nip">
                                    NIP
                                </Label>
                                <div className="control">
                                    <Input
                                        className="bg-white w-1/3 border-gray-600"
                                        type="text"
                                        id="nip"
                                        autoComplete="off"
                                        onChange={handleNipInput}
                                        value={nip}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field mt-4">
                                <Label htmlFor="jabatan">
                                    Jabatan
                                </Label>
                                <div className="control">
                                    <Input
                                        className="bg-white w-1/3 border-gray-600"
                                        type="text"
                                        id="jabatan"
                                        autoComplete="off"
                                        onChange={handleJabatanInput}
                                        value={jabatan}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field mt-4">
                                <Label className="label">
                                    Pangkat
                                </Label>
                                <div className="control">
                                    <Input
                                        className="bg-white w-1/3 border-gray-600"
                                        type="text"
                                        id="pangkat"
                                        autoComplete="off"
                                        onChange={handlePangkatInput}
                                        value={pangkat}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field mt-4">
                                <Label className="label">
                                    Bidang
                                </Label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <Select
                                            onValueChange={handleBidangInput}
                                            value=''
                                            required
                                            className="bg-white w-1/3 border-gray-600"
                                        >
                                            <SelectTrigger className="bg-white w-1/3 border-gray-600">
                                                <SelectValue placeholder={bidang} />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="sekretariat">Sekretariat</SelectItem>
                                                <SelectItem value="AKD">AKD</SelectItem>
                                                <SelectItem value="PPD">PPD</SelectItem>
                                                <SelectItem value="KRB">KRB</SelectItem>
                                                <SelectItem value="SUS">SUS</SelectItem>
                                            </SelectContent>
                                        </Select>


                                    </div>
                                </div>
                            </div>

                            <div className="field mt-8">
                                <div className="control">
                                    <Button
                                        disabled={isLoading}
                                        type='submit'
                                    >
                                        {isLoading && <LoaderCircle className="animate-spin" />}
                                        Save</Button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PegawaiEdit
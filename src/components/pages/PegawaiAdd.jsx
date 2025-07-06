import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { useEffect, useRef, useState } from "react"
import { useAddPgwMutation } from "@/features/pegawai/pgwAddApiSlice"
import { LoaderCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const PegawaiAdd = () => {


    const nameRef = useRef()
    const errRef = useRef()

    const [nama, setNama] = useState('')
    const [nip, setNip] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [pangkat, setPangkat] = useState('')
    const [bidang, setBidang] = useState('Pilih Bidang')


    const [errMsg, setErrMsg] = useState('')

    const [addPgw, { isLoading }] = useAddPgwMutation()
    console.log('errMsg dari PegawaiAdd.jsx: ', errMsg);


    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [nama, nip, jabatan, pangkat, bidang])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await addPgw({ nama, nip, jabatan, pangkat, bidang }).unwrap()
            // console.log('userData dari login: ', userData);
            // console.log('username dari login: ', username);
            setNama('')
            setNip('')
            setJabatan('')
            setPangkat('')
            setBidang('')

        } catch (error) {
            console.log('error dari login: ', error);
            if (!error?.status) {
                // console.log('error dari login: ', error.response);
                setErrMsg('No Server Response')
            } else if (error.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (error.status === 409) {
                setErrMsg(error.data.message)
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }
    }

    const handleNamaInput = (e) => setNama(e.target.value)
    const handleNipInput = (e) => setNip(e.target.value.trim())
    const handleJabatanInput = (e) => setJabatan(e.target.value)
    const handlePangkatInput = (e) => setPangkat(e.target.value)
    const handleBidangInput = (value) => setBidang(value)

    return (
        <div>

            <h1 className='subtitle'>Add new user</h1>
            {errMsg && <p className="errmsg">{errMsg}</p>}
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
                                        ref={nameRef}
                                        autoComplete="off"
                                        onChange={handleNamaInput}
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
                                            // defaultValue={bidang}
                                            required
                                            value={bidang}
                                            className=""
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

export default PegawaiAdd
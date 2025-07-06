import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../features/auth/authSlice"
import { useLoginMutation } from "../features/auth/authApiSlice"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading, }] = useLoginMutation()


    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({ username, password }).unwrap()
            // console.log('userData dari login: ', userData);
            // console.log('username dari login: ', username);


            dispatch(setCredentials({ ...userData, username }))
            setUsername('')
            setPassword('')
            navigate('/welcome')
        } catch (error) {
            console.log('error dari login: ', error);
            if (!error?.status) {
                // console.log('error dari login: ', error.response);                
                setErrMsg('No Server Response')
            } else if (error.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (error.status === 401) {
                setErrMsg(error.data.message)
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const content = (
        <div className="flex items-center justify-center min-h-screen">
            <div className="container md:w-1/4 mx-auto bg-slate-300 rounded-lg p-4">
                <section className="login">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-6">
                            <Label htmlFor="username">Username:</Label>
                            <Input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={handleUserInput}
                                value={username}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <Label htmlFor="password">Password:</Label>
                            <Input
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                            />
                        </div>
                        <Button disabled={isLoading} type="submit">
                            {isLoading && <LoaderCircle className="animate-spin" />}
                            Sign In
                        </Button>
                    </form>
                </section>
            </div>
        </div>
    )

    return content
}

export default Login
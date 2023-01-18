import { useContext, FormEvent, useRef, useState } from "react";
import { UserContext } from '../Utils/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/Styles/Login.css'


export const Login = () => {

    const userContext = useContext(UserContext)

    const emailRef = useRef(null)
    const [email, setEmail] = useState("")

    const [err, setErr] = useState("")

    const passwordRef = useRef(null)
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handelOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/user/login",
            {
                email,
                password
            }
        ).then((response) => {
            userContext?.setAuth(response.data)
            navigate('/', { replace: true })
        }).catch((err) => {
            setErr(err.response.data?.message)
        })

    }

    return (

        <div className="container">
            <div className="form-wrapper">
                <form className="login-from" onSubmit={(e) => handelOnSubmit(e)} >
                    <span className="login-title">Log In</span>
                    {err !== "" && <span className="login-err">{err}</span>}
                    <div className="input-field">
                        <input type="email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} required />
                        <span></span>
                        <label >Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} required />
                        <span></span>
                        <label >Password</label>
                    </div>
                    <div className="button">
                        <button className="submitButton" type="submit" >Login</button>
                    </div>

                </form>
            </div>
        </div>

    )
}
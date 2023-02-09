import { useContext, FormEvent, useRef, useState } from "react";
import { UserContext } from '../Utils/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/Styles/Login.css'
import Input from "../Components/Input";


export const Login = () => {

    const userContext = useContext(UserContext)

    const [email, setEmail] = useState("")

    const [err, setErr] = useState("")

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

            err.response ? setErr(err.response.data?.message) : setErr(err.message)
        })

    }

    return (

        <div className="container">
            <div className="form-wrapper">
                <form className="login-from" onSubmit={(e) => handelOnSubmit(e)} >
                    <span className="login-title">Log In</span>
                    {err !== "" && <span className="login-err">{err}</span>}

                    <Input classname="input-field" type="email" label="Email" handler={setEmail} />
                    <Input classname="input-field" type="password" label="Password" handler={setPassword} />

                    <div className="button">
                        <button className="submitButton" type="submit" >Login</button>
                    </div>

                </form>
            </div>
        </div>

    )
}
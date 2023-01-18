import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../Utils/userContext';

export const ProtectRoute = ({ children }: any) => {
    const userContext = useContext(UserContext)

    console.log(userContext?.auth)

    return (

        !userContext?.auth ? <Navigate to='login' /> : <Outlet />

    );
}
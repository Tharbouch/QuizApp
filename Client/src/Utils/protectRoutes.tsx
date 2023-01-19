import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../Utils/userContext';

export const ProtectRoute = ({ children, allowed }: any) => {
    const userContext = useContext(UserContext)


    return (
        allowed.includes(userContext?.auth?.accessRole) ? <Outlet /> : !userContext?.auth ? <Navigate to='login' /> : <Outlet />

    );
}
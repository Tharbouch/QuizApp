import { useContext } from "react";
import { UserContext } from '../Utils/userContext';
import { Outlet, NavLink } from "react-router-dom";
import '../assets/Styles/Layout.css'

export const RootLayout = () => {

    return (
        <>
            <main >
                <Outlet />
            </main>
        </>
    );
}

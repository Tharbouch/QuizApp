import { useContext } from "react";
import { UserContext } from '../Utils/userContext';
import { NavLink, Outlet } from "react-router-dom";
import '../assets/Styles/Layout.css'

export const RootLayout = () => {
    const userContext = useContext(UserContext)


    const handelOnClick = () => {
        userContext?.setAuth(null)
    }

    return (
        <>
            <header>
                <h1 >
                    <NavLink to='/'>Home</NavLink>
                </h1>
                <nav>
                    {
                        !userContext?.auth &&
                        <>
                            <NavLink to='/login'>Log In</NavLink>
                            <NavLink to='/register'>Sign Up</NavLink>
                        </>
                    }
                    {
                        userContext?.auth &&

                        <>
                            {
                                userContext?.auth.accessRole === "Professor" &&
                                <>
                                    <NavLink to='/quiz' >quiz</NavLink>
                                    <NavLink to='/questions' >questions</NavLink>
                                    <NavLink to='/login' onClick={handelOnClick}>Logout</NavLink>
                                </>
                            }

                            {
                                userContext?.auth.accessRole === "Student" &&
                                <>
                                    <NavLink to=''>Profile</NavLink>
                                    <NavLink to='/login' onClick={handelOnClick}>Logout</NavLink>
                                </>
                            }
                        </>
                    }
                </nav>
            </header>
            <main >
                <Outlet />
            </main>
        </>
    );
}

import React, { createContext, useState } from "react";


export type UserInfo = {
    userId: string,
    name: string,
    email: string,
    token: string,
    accessRole: string
}

type UserContextType = {
    auth: UserInfo | null
    setAuth: React.Dispatch<React.SetStateAction<UserInfo | null>>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [auth, setAuth] = useState<UserInfo | null>(null)

    return (
        <UserContext.Provider value={{ auth, setAuth }}>
            {children}
        </UserContext.Provider>
    )
}
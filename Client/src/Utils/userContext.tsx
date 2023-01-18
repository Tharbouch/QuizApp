import React, { createContext, useState } from "react";


export type UserInfo = {
    userId: String,
    name: String,
    email: String,
    token: String,
    accessRole: String
}

type UserContextType = {
    auth: UserInfo | null
    setAuth: React.Dispatch<React.SetStateAction<UserInfo | null>>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [auth, setAuth] = useState<UserInfo | null>(null)

    return (
        <UserContext.Provider value={{ auth, setAuth }}>
            {children}
        </UserContext.Provider>
    )
}
import React from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<AuthProviderValueType>({})

export const useAuth = () => useContext(AuthContext)

export type AuthProviderPropsType = {
    children: React.ReactElement
}

export type AuthProviderValueType = {
    isAuthenticated?: boolean
    user?: any
    token?: string
}

const AuthProvider: React.FC<AuthProviderPropsType> = (props) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)
    const [token, setToken] = useState<string>("")
    
    const login = (username: string, password: string) => {
        //login
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, user, token}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
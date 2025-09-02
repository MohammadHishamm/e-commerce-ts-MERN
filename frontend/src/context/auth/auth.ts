import { createContext, useContext } from "react";

interface authContextType{
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
}



export const AuthContext = createContext<authContextType>({username: null, token: null, login: () => {}})

export const useAuth = ()=> useContext(AuthContext);
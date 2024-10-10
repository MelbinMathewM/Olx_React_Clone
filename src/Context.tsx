import React, { createContext, ReactNode, useContext, useState } from "react";

interface MyComponentProps {
    children : ReactNode
}

interface UserContextType {
    user : string | undefined | null;
    setUser : React.Dispatch<React.SetStateAction<string | undefined | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({children} : MyComponentProps) => {
    const [user, setUser] = useState<string | undefined | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error('useUser must be used within a UserProvider')
    }
    return context;
}

export {useUser, UserProvider}
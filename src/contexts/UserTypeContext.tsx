import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserType } from "../services/user.service";

interface UserTypeContextValue {
    userType: string | null;
    isCustomer: boolean;
    isResponsable: boolean;
    loading: boolean;
}

const UserTypeContext = createContext<UserTypeContextValue>({
    userType: null,
    isCustomer: false,
    isResponsable: false,
    loading: true,
});

export const UserTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userType, setUserType] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserType()
            .then((user) => {
                setUserType(user.type);
            })
            .catch(() => setUserType(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <UserTypeContext.Provider value={{ userType, isCustomer: userType === "cliente", isResponsable: userType === "mestre", loading }}>
            {children}
        </UserTypeContext.Provider>
    );
};

export function useUserType() {
    return useContext(UserTypeContext);
}

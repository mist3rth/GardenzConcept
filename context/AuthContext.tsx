import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem('gardenz_auth');
        const storedEmail = localStorage.getItem('gardenz_email');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            setUserEmail(storedEmail);
        }
    }, []);

    const login = (email: string) => {
        setIsAuthenticated(true);
        setUserEmail(email);
        localStorage.setItem('gardenz_auth', 'true');
        localStorage.setItem('gardenz_email', email);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        localStorage.removeItem('gardenz_auth');
        localStorage.removeItem('gardenz_email');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

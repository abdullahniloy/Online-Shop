import React, { createContext } from 'react'
import useAllState from '../hooks/useAllState'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const allProvider = useAllState()
    return (
        <AuthContext.Provider value={allProvider}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
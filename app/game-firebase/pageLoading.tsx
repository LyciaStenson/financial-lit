'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getCurrentApp } from '@/src/FirebaseBridge/firebaseApp';
import { getCurrentUser, setCurrentUser } from '@/src/FirebaseBridge/Auth/currentUser';
import getData from '@/src/FirebaseBridge/firestore/getData';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { notFound } from 'next/navigation';

// Initialize Firebase auth instance
const auth = getAuth(getCurrentApp());

// Create the authentication context
export const AuthContext = createContext({});

// Custom hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps): JSX.Element {
    // Set up state to track the authenticated user and loading status
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to the authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

                getData("users/", user.uid).then((value: { result: DocumentSnapshot<DocumentData, DocumentData> | null }) => {
                    let data = value.result?.data();
                    setCurrentUser(data?.UUID, data?.emailID, data?.dispalyName, data?.role);
                });
            } else {
                // User is signed out
                setUser(null);
            }
            // Set loading to false once authentication state is determined
            setLoading(false);
        });

        // Unsubscribe from the authentication state changes when the component is unmounted
        return () => unsubscribe();
    }, []);

    // Provide the authentication context to child components
    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}
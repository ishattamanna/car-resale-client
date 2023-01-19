import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const googleSignIn = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    };
    const updateUserProfile = (profile) => {
        setLoader(true);
        return updateProfile(auth.currentUser, profile)
    };
    const signIn = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const passwordReset = (email) => {
        setLoader(true);
        return sendPasswordResetEmail(auth, email);
    }
    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    };


    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoader(false);
        });

        return () => {
            unsubscribed();
        }

    }, []);


    const authInfo = {
        user,
        loader,
        createUser,
        googleSignIn,
        updateUserProfile,
        signIn,
        passwordReset,
        logOut
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
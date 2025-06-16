import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../firebase.init";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const signUp = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, { displayName, photoURL});
            setUser(auth.currentUser);
            setLoading(false);
            return result
        }
        catch (error) {
            setLoading(false);
            throw error;
        }
    }

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            return result;
        }
        catch (error) {
            setLoading(false);
            throw error;
        }
    }
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setLoading(false);
            return result;
        }
        catch (error) {
            setLoading(false);
            throw error;
        }
    }
    const logOut = async () => {
        setLoading(true);
        try {
            const result = await signOut(auth);
            setLoading(false);
            return result;
        }
        catch (error) {
            setLoading(false);
            throw error;
        }
    }
    const updateUserProfile = async (displayName, photoURL) => {
        setLoading(true);
        try {
            const result = await updateProfile(auth.currentUser, { displayName, photoURL});
            setLoading(false);
            return result;
        }
        catch (error) {
            setLoading(false);
            throw error;
        }
    }

    const resetPassword = async (email) => {
        setLoading(true);
        try {
            const result = await sendPasswordResetEmail(auth, email);
            setLoading(false);
            return result;
        }
        catch (error) {
            setLoading(false);
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    },[])

    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        resetPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
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
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/artifactApi.js';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const signUp = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, { displayName, photoURL });
            setUser(auth.currentUser);
            setLoading(false);
            toast.success('Account created successfully');
            return result
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    }

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            toast.success('Logged in successfully');
            return result;
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    }
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setLoading(false);
            toast.success('Logged in with Google successfully');
            return result;
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    }
    const logOut = async () => {
        setLoading(true);
        try {
            const result = await signOut(auth);
            setLoading(false);
            toast.success('Logged out successfully');
            return result;
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    }
    const updateUserProfile = async (displayName, photoURL) => {
        setLoading(true);
        try {
            const result = await updateProfile(auth.currentUser, { displayName, photoURL });
            setLoading(false);
            toast.success('Profile updated successfully');
            return result;
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    }

    const resetPassword = async (email) => {
        setLoading(true);
        try {
            const result = await sendPasswordResetEmail(auth, email);
            setLoading(false);
            toast.success('Password reset email sent');
            return result;
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                try {
                    const res = await fetch(`${BASE_URL}/jwt`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: currentUser.email }),
                    });
                    await res.json();
                }
                catch (err) {
                    console.error('JWT fetch failed', err);
                }
            }

            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

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
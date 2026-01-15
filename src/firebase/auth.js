// Firebase Authentication Helpers
import {
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    signInAnonymously
} from 'firebase/auth';
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();

// Google Sign In (Popup)
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Google Sign In (Redirect - Better for mobile)
export const signInWithGoogleRedirect = async () => {
    try {
        await signInWithRedirect(auth, googleProvider);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Check for Redirect Result
export const checkRedirectResult = async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            return { user: result.user, error: null };
        }
        return { user: null, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Email/Password Sign In
export const signInWithEmail = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { user: result.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Email/Password Sign Up
export const signUpWithEmail = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return { user: result.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Anonymous Sign In (For Admin)
export const signInAnonymous = async () => {
    try {
        const result = await signInAnonymously(auth);
        return { user: result.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

// Sign Out
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

// Auth State Observer
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

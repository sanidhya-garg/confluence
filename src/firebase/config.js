// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBwQWedDJmmsRtvonx55O8zjkez43_bcJM",
    authDomain: "confluence-edc-iitd.firebaseapp.com",
    projectId: "confluence-edc-iitd",
    storageBucket: "confluence-edc-iitd.firebasestorage.app",
    messagingSenderId: "93901968266",
    appId: "1:93901968266:web:cf6f654f89faf1590d2e73",
    measurementId: "G-LCTYFX7VYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;

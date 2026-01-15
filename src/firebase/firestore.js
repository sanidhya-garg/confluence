// Firestore Helpers for Applications
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    doc,
    updateDoc,
    getDoc
} from 'firebase/firestore';
import { db } from './config';

const APPLICATIONS_COLLECTION = 'applications';

// Submit a new application
export const submitApplication = async (applicationData, userId) => {
    try {
        const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
            ...applicationData,
            userId,
            status: 'pending',
            createdAt: serverTimestamp()
        });
        return { id: docRef.id, error: null };
    } catch (error) {
        return { id: null, error: error.message };
    }
};

// Get all applications (for admin dashboard)
export const getApplications = async () => {
    try {
        const q = query(
            collection(db, APPLICATIONS_COLLECTION),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const applications = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return { applications, error: null };
    } catch (error) {
        return { applications: [], error: error.message };
    }
};

// Get user's application
export const getUserApplication = async (userId) => {
    try {
        const q = query(
            collection(db, APPLICATIONS_COLLECTION),
            where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return { application: null, error: null };
        }
        const doc = querySnapshot.docs[0];
        return {
            application: { id: doc.id, ...doc.data() },
            error: null
        };
    } catch (error) {
        return { application: null, error: error.message };
    }
};

// Get single application by ID
export const getApplicationById = async (id) => {
    try {
        const docRef = doc(db, APPLICATIONS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { application: { id: docSnap.id, ...docSnap.data() }, error: null };
        } else {
            return { application: null, error: 'Application not found' };
        }
    } catch (error) {
        return { application: null, error: error.message };
    }
};

// Update application status (approve/reject)
export const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
        const docRef = doc(db, APPLICATIONS_COLLECTION, applicationId);
        await updateDoc(docRef, {
            status: newStatus,
            updatedAt: serverTimestamp()
        });
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
};

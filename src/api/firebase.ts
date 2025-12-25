import {
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, Bill, BillParticipant, Group } from '../types';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

// Auth
export const signInWithGoogle = async (): Promise<User> => {
  try {
    // For now, create a mock user for testing
    // In production, you'd use expo-auth-session with Google OAuth
    const mockUser: User = {
      id: 'demo-user-' + Date.now(),
      name: 'Demo User',
      email: 'demo@billsplit.com',
      createdAt: new Date(),
    };

    // Save to Firestore
    const userRef = doc(db, 'users', mockUser.id);
    await setDoc(userRef, {
      ...mockUser,
      createdAt: Timestamp.fromDate(mockUser.createdAt),
    });

    return mockUser;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser: any) => {
    if (firebaseUser) {
      const user = await getUserById(firebaseUser.uid);
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Users
const createOrUpdateUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  const userData: User = {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || 'User',
    email: firebaseUser.email || '',
    phone: firebaseUser.phoneNumber || undefined,
    photoURL: firebaseUser.photoURL || undefined,
    createdAt: userSnap.exists() ? userSnap.data().createdAt.toDate() : new Date(),
  };

  await setDoc(userRef, {
    ...userData,
    createdAt: Timestamp.fromDate(userData.createdAt),
  }, { merge: true });

  return userData;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const data = userSnap.data();
  return {
    ...data,
    id: userSnap.id,
    createdAt: data.createdAt.toDate(),
  } as User;
};

export const updateUserUpiId = async (userId: string, upiId: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { upiId });
};

// Bills
export const uploadBillImage = async (uri: string, userId: string): Promise<string> => {
  try {
    // Alternative method: Store as base64 in Firestore (no Storage needed!)
    // This is FREE and works without enabling Firebase Storage

    // For now, just return the local URI
    // The image will be stored locally on the device
    // In production, you could compress and store as base64 in Firestore

    console.log('Image stored locally:', uri);
    return uri;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const createBill = async (bill: Omit<Bill, 'id'>): Promise<string> => {
  const billsRef = collection(db, 'bills');
  const docRef = await addDoc(billsRef, {
    ...bill,
    createdAt: Timestamp.fromDate(bill.createdAt),
  });
  return docRef.id;
};

export const getBillsByUser = async (userId: string): Promise<Bill[]> => {
  const billsRef = collection(db, 'bills');
  const q = query(billsRef, where('createdBy', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: doc.data().createdAt.toDate(),
  })) as Bill[];
};

// Bill Participants
export const createBillParticipants = async (participants: Omit<BillParticipant, 'id'>[]): Promise<void> => {
  const promises = participants.map(async (participant) => {
    const participantsRef = collection(db, 'billParticipants');
    await addDoc(participantsRef, participant);
  });

  await Promise.all(promises);
};

export const getParticipantsByBill = async (billId: string): Promise<BillParticipant[]> => {
  const participantsRef = collection(db, 'billParticipants');
  const q = query(participantsRef, where('billId', '==', billId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
  })) as BillParticipant[];
};

export const updateParticipantStatus = async (participantId: string, status: 'paid' | 'unpaid') => {
  const participantRef = doc(db, 'billParticipants', participantId);
  await updateDoc(participantRef, {
    status,
    paidAt: status === 'paid' ? Timestamp.now() : null
  });
};

// Groups
export const createGroup = async (group: Omit<Group, 'id'>): Promise<string> => {
  const groupsRef = collection(db, 'groups');
  const docRef = await addDoc(groupsRef, {
    ...group,
    createdAt: Timestamp.fromDate(group.createdAt),
  });
  return docRef.id;
};

export const getGroupsByUser = async (userId: string): Promise<Group[]> => {
  const groupsRef = collection(db, 'groups');
  const q = query(groupsRef, where('members', 'array-contains', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: doc.data().createdAt.toDate(),
  })) as Group[];
};
